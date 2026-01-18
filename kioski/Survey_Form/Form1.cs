using System.Drawing.Printing;
using System.Text.Json;
using System.Net.Http;
using System.Text;

namespace Survey_Form
{
    public partial class Form1 : Form
    {
        private const string API_URL = "http://localhost:5000/api/survey"; // Change to your Flask API URL

        public Form1()
        {
            InitializeComponent();
            ApplyModernUI();
            InitializeCheckboxLogic();

            // Attach submit button event
            btnSubmit.Click += BtnSubmit_Click;
        }

        // ========== SUBMIT BUTTON HANDLER ==========
        private async void BtnSubmit_Click(object sender, EventArgs e)
        {
            try
            {
                // Validate form
                if (!ValidateForm())
                {
                    MessageBox.Show("Please fill in all required fields.", "Validation Error",
                        MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }

                // Create JSON object
                var surveyData = CreateSurveyJson();

                // Show JSON preview (optional)
                string jsonString = JsonSerializer.Serialize(surveyData, new JsonSerializerOptions
                {
                    WriteIndented = true
                });

                // Uncomment to see JSON before sending
                // MessageBox.Show(jsonString, "Survey Data JSON");

                // Send to Flask API
                bool success = await SendToApi(jsonString);

                if (success)
                {
                    MessageBox.Show("Survey submitted successfully!", "Success",
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                    ClearForm();
                }
                else
                {
                    MessageBox.Show("Failed to submit survey. Please try again.", "Error",
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        // ========== CREATE JSON OBJECT ==========
        private Dictionary<string, object> CreateSurveyJson()
        {
            var data = new Dictionary<string, object>
            {
                ["office"] = cbxOpisina.Text,
                ["client_type"] = GetClientType(),
                ["gender"] = GetGender(),
                ["age"] = int.TryParse(txtEdad.Text, out int age) ? age : 0,
                ["place"] = txtTirahan.Text,
                ["religion"] = "", // Add religion field if needed
                ["service_type"] = txtService.Text,
                ["employee_name"] = txtEmployeeOffice.Text,
                ["service_date"] = dateTimePicker1.Value.ToString("yyyy-MM-dd"),

                // Citizens Charter responses
                ["cc1"] = GetCCResponse(1),
                ["cc2"] = GetCCResponse(2),
                ["cc3"] = GetCCResponse(3),

                // Service satisfaction ratings
                ["responsiveness"] = GetScoreFromGroup(gbxResponsiveness),
                ["reliability"] = GetScoreFromGroup(gbxReliability),
                ["facilities"] = GetScoreFromGroup(gbxFacilities),
                ["communication"] = GetScoreFromGroup(gbxCommunication),
                ["costs"] = GetScoreFromGroup(gbxCost),
                ["integrity"] = GetScoreFromGroup(gbxIntegrity),
                ["assurance"] = 0, // Add assurance field if needed
                ["outcome"] = 0, // Add outcome field if needed

                // Optional fields
                ["comment"] = txtComment.Text,
                ["email"] = ExtractEmail(txtContactInfo.Text),
                ["phone_number"] = ExtractPhone(txtContactInfo.Text)
            };

            return data;
        }

        // ========== SEND TO FLASK API ==========
        private async Task<bool> SendToApi(string jsonData)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(30);

                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync(API_URL, content);

                    return response.IsSuccessStatusCode;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"API Error: {ex.Message}", "Connection Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
        }

        // ========== VALIDATION ==========
        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(cbxOpisina.Text))
                return false;

            if (!rdoGeneralPublic.Checked && !rdoGovEmployee.Checked && !rdoBusiness.Checked)
                return false;

            if (!rdoLalaki.Checked && !rdoBabae.Checked)
                return false;

            if (string.IsNullOrWhiteSpace(txtEdad.Text))
                return false;

            if (string.IsNullOrWhiteSpace(txtTirahan.Text))
                return false;

            if (string.IsNullOrWhiteSpace(txtService.Text))
                return false;

            return true;
        }

        // ========== HELPER FUNCTIONS ==========
        private string GetClientType()
        {
            if (rdoGeneralPublic.Checked) return "General Public";
            if (rdoGovEmployee.Checked) return "Government Employee";
            if (rdoBusiness.Checked) return "Business or Private Organizations";
            return "";
        }

        private string GetGender()
        {
            if (rdoLalaki.Checked) return "Male";
            if (rdoBabae.Checked) return "Female";
            return "";
        }

        private int GetCCResponse(int questionNumber)
        {
            List<CheckBox> checkboxes = new List<CheckBox>();

            if (questionNumber == 1)
            {
                checkboxes = new List<CheckBox> { chkCC1_1, chkCC1_2, chkCC1_3, chkCC1_4 };
            }
            else if (questionNumber == 2)
            {
                checkboxes = new List<CheckBox> { chkCC2_1, chkCC2_2, chkCC2_3, chkCC2_4, chkCC2_5 };
            }
            else if (questionNumber == 3)
            {
                checkboxes = new List<CheckBox> { checkBox5, checkBox4, checkBox3, checkBox2 };
            }

            for (int i = 0; i < checkboxes.Count; i++)
            {
                if (checkboxes[i].Checked)
                    return i + 1;
            }

            return 0;
        }

        private string ExtractEmail(string contactInfo)
        {
            if (string.IsNullOrWhiteSpace(contactInfo))
                return "";

            // Simple email extraction
            var parts = contactInfo.Split(new[] { ',', ';', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var part in parts)
            {
                if (part.Contains("@"))
                    return part.Trim();
            }

            return "";
        }

        private string ExtractPhone(string contactInfo)
        {
            if (string.IsNullOrWhiteSpace(contactInfo))
                return "";

            // Simple phone extraction - looks for numbers
            var parts = contactInfo.Split(new[] { ',', ';', ' ' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var part in parts)
            {
                if (part.All(c => char.IsDigit(c) || c == '+' || c == '-') && part.Length >= 10)
                    return part.Trim();
            }

            return "";
        }

        private void ClearForm()
        {
            // Clear all inputs
            cbxOpisina.SelectedIndex = -1;
            rdoGeneralPublic.Checked = false;
            rdoGovEmployee.Checked = false;
            rdoBusiness.Checked = false;
            rdoLalaki.Checked = false;
            rdoBabae.Checked = false;
            txtEdad.Clear();
            txtTirahan.Clear();
            txtService.Clear();
            txtEmployeeOffice.Clear();
            txtComment.Clear();
            txtContactInfo.Clear();
            dateTimePicker1.Value = DateTime.Now;

            // Clear all checkboxes
            foreach (var control in Controls.OfType<GroupBox>())
            {
                foreach (var checkbox in control.Controls.OfType<CheckBox>())
                {
                    checkbox.Checked = false;
                }
            }
        }

        // ========== MAKE ALL CHECKBOX GROUPS ACT LIKE RADIO BUTTONS ==========
        private void InitializeCheckboxLogic()
        {
            AttachGroupLogic(gbxResponsiveness);
            AttachGroupLogic(gbxReliability);
            AttachGroupLogic(gbxFacilities);
            AttachGroupLogic(gbxCommunication);
            AttachGroupLogic(gbxCost);
            AttachGroupLogic(gbxIntegrity);
        }

        private void AttachGroupLogic(GroupBox group)
        {
            foreach (CheckBox cb in group.Controls.OfType<CheckBox>())
            {
                cb.CheckedChanged += (s, e) =>
                {
                    if (cb.Checked)
                    {
                        foreach (CheckBox other in group.Controls.OfType<CheckBox>())
                        {
                            if (other != cb)
                                other.Checked = false;
                        }
                    }
                };
            }
        }

        // ========== GENERIC FUNCTION TO GET SCORE FROM ANY GROUP ==========
        private int GetScoreFromGroup(GroupBox gb)
        {
            foreach (CheckBox cb in gb.Controls.OfType<CheckBox>())
            {
                if (cb.Checked)
                {
                    // extract last character as number (0–5)
                    string text = cb.Name;
                    char last = text[text.Length - 1];
                    return int.Parse(last.ToString());
                }
            }
            return 0; // none selected
        }

        // ========== COMPUTE WEIGHTED MEAN ==========
        private double ComputeWeightedMean()
        {
            List<GroupBox> ratingGroups = new List<GroupBox>
            {
                gbxResponsiveness,
                gbxReliability,
                gbxFacilities,
                gbxCommunication,
                gbxIntegrity,
                gbxCost,
            };

            int total = 0;
            int count = 0;

            foreach (GroupBox gb in ratingGroups)
            {
                int score = GetScoreFromGroup(gb);
                if (score > 0)
                {
                    total += score;
                    count++;
                }
            }

            return count == 0 ? 0 : (double)total / count;
        }

        // ========== MODERN UI ==========
        private void ApplyModernUI()
        {
            BackColor = Color.White;
            Font = new Font("Segoe UI", 9F);

            foreach (Button b in Controls.OfType<Button>())
            {
                b.FlatStyle = FlatStyle.Flat;
                b.BackColor = Color.FromArgb(0, 120, 215);
                b.ForeColor = Color.White;
            }
        }

        private void lblService1_Click(object sender, EventArgs e)
        {
        }
    }
}