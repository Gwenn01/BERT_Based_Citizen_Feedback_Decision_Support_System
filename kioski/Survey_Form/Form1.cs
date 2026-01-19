using System.Drawing.Printing;
using System.Text.Json;
using System.Net.Http;
using System.Text;

namespace Survey_Form
{
    public partial class Form1 : Form
    {
        private const string API_URL = "http://127.0.0.1:5000/api/get-survey-client"; // Change to your Flask API URL

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

                // ✅ FIXED: Set valid defaults (3 = neutral rating)
                ["assurance"] = 3,
                ["outcome"] = 3,

                // Optional fields
                ["comment"] = txtComment.Text,
                ["email"] = ExtractEmail(txtContactInfo.Text),
                ["phone_number"] = ExtractPhone(txtContactInfo.Text)
            };

            return data;
        }

        // ========== SEND TO FLASK API (IMPROVED) ==========
        private async Task<bool> SendToApi(string jsonData)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(30);

                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    // Log what we're sending
                    System.Diagnostics.Debug.WriteLine("Sending JSON:");
                    System.Diagnostics.Debug.WriteLine(jsonData);

                    var response = await client.PostAsync(API_URL, content);

                    // Get response body for debugging
                    string responseBody = await response.Content.ReadAsStringAsync();
                    System.Diagnostics.Debug.WriteLine($"Response Status: {response.StatusCode}");
                    System.Diagnostics.Debug.WriteLine($"Response Body: {responseBody}");

                    if (!response.IsSuccessStatusCode)
                    {
                        MessageBox.Show($"Server Error ({response.StatusCode}): {responseBody}",
                            "API Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        return false;
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"API Error: {ex.Message}\n\nStack Trace: {ex.StackTrace}",
                    "Connection Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
        }

        // ========== VALIDATION ==========
        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(cbxOpisina.Text))
            {
                MessageBox.Show("Please select an office.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (!rdoGeneralPublic.Checked && !rdoGovEmployee.Checked && !rdoBusiness.Checked)
            {
                MessageBox.Show("Please select a client type.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (!rdoLalaki.Checked && !rdoBabae.Checked)
            {
                MessageBox.Show("Please select gender.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (string.IsNullOrWhiteSpace(txtEdad.Text))
            {
                MessageBox.Show("Please enter your age.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            // Validate age is a number
            if (!int.TryParse(txtEdad.Text, out int age) || age < 1 || age > 120)
            {
                MessageBox.Show("Please enter a valid age (1-120).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (string.IsNullOrWhiteSpace(txtTirahan.Text))
            {
                MessageBox.Show("Please enter your place of residence.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (string.IsNullOrWhiteSpace(txtService.Text))
            {
                MessageBox.Show("Please enter the service type.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            // ✅ ADDED: Validate rating groups
            if (GetScoreFromGroup(gbxResponsiveness) == 0)
            {
                MessageBox.Show("Please rate Responsiveness (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetScoreFromGroup(gbxReliability) == 0)
            {
                MessageBox.Show("Please rate Reliability (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetScoreFromGroup(gbxFacilities) == 0)
            {
                MessageBox.Show("Please rate Facilities (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetScoreFromGroup(gbxCommunication) == 0)
            {
                MessageBox.Show("Please rate Communication (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetScoreFromGroup(gbxCost) == 0)
            {
                MessageBox.Show("Please rate Costs (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetScoreFromGroup(gbxIntegrity) == 0)
            {
                MessageBox.Show("Please rate Integrity (1-5).", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            // ✅ ADDED: Validate Citizens Charter responses
            if (GetCCResponse(1) == 0)
            {
                MessageBox.Show("Please answer Citizens Charter Question 1.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetCCResponse(2) == 0)
            {
                MessageBox.Show("Please answer Citizens Charter Question 2.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

            if (GetCCResponse(3) == 0)
            {
                MessageBox.Show("Please answer Citizens Charter Question 3.", "Validation Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false;
            }

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

        // ========== FIXED: Citizens Charter Response Getter ==========
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
                // FIXED: Changed from inconsistent names to proper naming
                checkboxes = new List<CheckBox> { chkCC3_1, chkCC3_2, chkCC3_3, chkCC3_4 };
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
            ClearAllCheckboxes(this);
        }

        // ========== HELPER: Clear all checkboxes recursively ==========
        private void ClearAllCheckboxes(Control parent)
        {
            foreach (Control control in parent.Controls)
            {
                if (control is CheckBox checkbox)
                {
                    checkbox.Checked = false;
                }
                else if (control.HasChildren)
                {
                    ClearAllCheckboxes(control);
                }
            }
        }

        // ========== MAKE ALL CHECKBOX GROUPS ACT LIKE RADIO BUTTONS ==========
        private void InitializeCheckboxLogic()
        {
            // Service rating groups
            AttachGroupLogic(gbxResponsiveness);
            AttachGroupLogic(gbxReliability);
            AttachGroupLogic(gbxFacilities);
            AttachGroupLogic(gbxCommunication);
            AttachGroupLogic(gbxCost);
            AttachGroupLogic(gbxIntegrity);

            // Citizens Charter groups - make them act like radio buttons
            AttachCCGroupLogic(new[] { chkCC1_1, chkCC1_2, chkCC1_3, chkCC1_4 });
            AttachCCGroupLogic(new[] { chkCC2_1, chkCC2_2, chkCC2_3, chkCC2_4, chkCC2_5 });
            AttachCCGroupLogic(new[] { chkCC3_1, chkCC3_2, chkCC3_3, chkCC3_4 });
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

        // ========== Citizens Charter radio button logic ==========
        private void AttachCCGroupLogic(CheckBox[] checkboxes)
        {
            foreach (CheckBox cb in checkboxes)
            {
                cb.CheckedChanged += (s, e) =>
                {
                    if (cb.Checked)
                    {
                        foreach (CheckBox other in checkboxes)
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
                    // extract last character as number (1–5)
                    string text = cb.Name;
                    char last = text[text.Length - 1];
                    if (char.IsDigit(last))
                    {
                        return int.Parse(last.ToString());
                    }
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