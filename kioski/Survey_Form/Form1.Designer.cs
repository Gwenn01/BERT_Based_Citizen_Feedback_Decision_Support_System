namespace Survey_Form
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;

        private System.Windows.Forms.Label lblHeader;
        private System.Windows.Forms.Label lblSubHeader;
        private System.Windows.Forms.Label lblHelpText;
        private System.Windows.Forms.Label lblDescription;
        private System.Windows.Forms.GroupBox grpClientType;
        private System.Windows.Forms.RadioButton rdoGeneralPublic;
        private System.Windows.Forms.RadioButton rdoGovEmployee;
        private System.Windows.Forms.RadioButton rdoBusiness;
        private System.Windows.Forms.GroupBox grpClientInfo;
        private System.Windows.Forms.Label lblOffice;
        private System.Windows.Forms.Label lblPetsa;
        private System.Windows.Forms.Label lblService;
        private System.Windows.Forms.TextBox txtService;
        private System.Windows.Forms.Label lblEmployeeOffice;
        private System.Windows.Forms.TextBox txtEmployeeOffice;
        private System.Windows.Forms.GroupBox grpCitizensCharter;
        private System.Windows.Forms.Label lblCCInstruction;
        private System.Windows.Forms.Label lblCC1;
        private System.Windows.Forms.CheckBox chkCC1_1;
        private System.Windows.Forms.CheckBox chkCC1_2;
        private System.Windows.Forms.CheckBox chkCC1_3;
        private System.Windows.Forms.CheckBox chkCC1_4;
        private System.Windows.Forms.Label lblCC2;
        private System.Windows.Forms.CheckBox chkCC2_1;
        private System.Windows.Forms.CheckBox chkCC2_2;
        private System.Windows.Forms.CheckBox chkCC2_3;
        private System.Windows.Forms.CheckBox chkCC2_4;
        private System.Windows.Forms.CheckBox chkCC2_5;
        private System.Windows.Forms.Label lblService6;
        private System.Windows.Forms.GroupBox grpComplaints;
        private System.Windows.Forms.TextBox txtComment;
        private System.Windows.Forms.GroupBox grpContactInfo;
        private System.Windows.Forms.TextBox txtContactInfo;
        private System.Windows.Forms.Button btnCompute;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Button btnPrint;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            lblHeader = new Label();
            lblSubHeader = new Label();
            lblHelpText = new Label();
            lblDescription = new Label();
            grpClientType = new GroupBox();
            rdoBusiness = new RadioButton();
            rdoGovEmployee = new RadioButton();
            rdoGeneralPublic = new RadioButton();
            grpClientInfo = new GroupBox();
            cbxOpisina = new ComboBox();
            dateTimePicker1 = new DateTimePicker();
            txtEmployeeOffice = new TextBox();
            lblEmployeeOffice = new Label();
            txtService = new TextBox();
            lblService = new Label();
            lblPetsa = new Label();
            lblOffice = new Label();
            grpCitizensCharter = new GroupBox();
            checkBox2 = new CheckBox();
            checkBox3 = new CheckBox();
            checkBox4 = new CheckBox();
            checkBox5 = new CheckBox();
            label4 = new Label();
            chkCC2_5 = new CheckBox();
            chkCC2_4 = new CheckBox();
            chkCC2_3 = new CheckBox();
            chkCC2_2 = new CheckBox();
            chkCC2_1 = new CheckBox();
            lblCC2 = new Label();
            chkCC1_4 = new CheckBox();
            chkCC1_3 = new CheckBox();
            chkCC1_2 = new CheckBox();
            chkCC1_1 = new CheckBox();
            lblCC1 = new Label();
            lblCCInstruction = new Label();
            lblService1 = new Label();
            lblService2 = new Label();
            lblService6 = new Label();
            grpComplaints = new GroupBox();
            txtComment = new TextBox();
            grpContactInfo = new GroupBox();
            txtContactInfo = new TextBox();
            pictureBox1 = new PictureBox();
            groupBox1 = new GroupBox();
            txtEdad = new TextBox();
            label3 = new Label();
            rdoBabae = new RadioButton();
            rdoLalaki = new RadioButton();
            label2 = new Label();
            txtTirahan = new TextBox();
            label1 = new Label();
            lblSatisfactionInstruction = new Label();
            lblService3 = new Label();
            lblService4 = new Label();
            lblService5 = new Label();
            lblRating5 = new Label();
            lblRating4 = new Label();
            lblRating3 = new Label();
            lblRating2 = new Label();
            lblRating1 = new Label();
            grpSatisfaction = new GroupBox();
            gbxIntegrity = new GroupBox();
            cbxIntegrity0 = new CheckBox();
            cbxIntegrity1 = new CheckBox();
            cbxIntegrity2 = new CheckBox();
            cbxIntegrity3 = new CheckBox();
            cbxIntegrity4 = new CheckBox();
            cbxIntegrity5 = new CheckBox();
            gbxCost = new GroupBox();
            groupBox8 = new GroupBox();
            checkBox29 = new CheckBox();
            checkBox30 = new CheckBox();
            checkBox31 = new CheckBox();
            checkBox32 = new CheckBox();
            checkBox33 = new CheckBox();
            checkBox34 = new CheckBox();
            cbxCosts0 = new CheckBox();
            cbxCosts1 = new CheckBox();
            cbxCosts2 = new CheckBox();
            cbxCosts3 = new CheckBox();
            cbxCosts4 = new CheckBox();
            cbxCosts5 = new CheckBox();
            gbxCommunication = new GroupBox();
            cbxCommunication0 = new CheckBox();
            cbxCommunication1 = new CheckBox();
            cbxCommunication2 = new CheckBox();
            cbxCommunication3 = new CheckBox();
            cbxCommunication4 = new CheckBox();
            cbxCommunication5 = new CheckBox();
            gbxFacilities = new GroupBox();
            cbxFacilities0 = new CheckBox();
            cbxFacilities1 = new CheckBox();
            cbxFacilities2 = new CheckBox();
            cbxFacilities3 = new CheckBox();
            cbxFacilities4 = new CheckBox();
            cbxFacilities5 = new CheckBox();
            gbxReliability = new GroupBox();
            cbxReliability0 = new CheckBox();
            cbxReliability1 = new CheckBox();
            cbxReliability2 = new CheckBox();
            cbxReliability3 = new CheckBox();
            cbxReliability4 = new CheckBox();
            cbxReliability5 = new CheckBox();
            gbxResponsiveness = new GroupBox();
            cbxResponsiveness0 = new CheckBox();
            cbxResponsiveness1 = new CheckBox();
            cbxResponsiveness2 = new CheckBox();
            cbxResponsiveness3 = new CheckBox();
            cbxResponsiveness4 = new CheckBox();
            cbxResponsiveness5 = new CheckBox();
            label5 = new Label();
            pictureBox6 = new PictureBox();
            pictureBox5 = new PictureBox();
            pictureBox4 = new PictureBox();
            pictureBox3 = new PictureBox();
            pictureBox2 = new PictureBox();
            groupBox2 = new GroupBox();
            groupBox7 = new GroupBox();
            label11 = new Label();
            groupBox5 = new GroupBox();
            label9 = new Label();
            groupBox4 = new GroupBox();
            label8 = new Label();
            groupBox3 = new GroupBox();
            label7 = new Label();
            label6 = new Label();
            groupBox6 = new GroupBox();
            label10 = new Label();
            btnSubmit = new Button();
            grpClientType.SuspendLayout();
            grpClientInfo.SuspendLayout();
            grpCitizensCharter.SuspendLayout();
            grpComplaints.SuspendLayout();
            grpContactInfo.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            groupBox1.SuspendLayout();
            grpSatisfaction.SuspendLayout();
            gbxIntegrity.SuspendLayout();
            gbxCost.SuspendLayout();
            groupBox8.SuspendLayout();
            gbxCommunication.SuspendLayout();
            gbxFacilities.SuspendLayout();
            gbxReliability.SuspendLayout();
            gbxResponsiveness.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox6).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox5).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox4).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
            groupBox2.SuspendLayout();
            groupBox7.SuspendLayout();
            groupBox5.SuspendLayout();
            groupBox4.SuspendLayout();
            groupBox3.SuspendLayout();
            groupBox6.SuspendLayout();
            SuspendLayout();
            // 
            // lblHeader
            // 
            lblHeader.AutoSize = true;
            lblHeader.Font = new Font("Times New Roman", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblHeader.Location = new Point(343, 59);
            lblHeader.Name = "lblHeader";
            lblHeader.Size = new Size(428, 26);
            lblHeader.TabIndex = 0;
            lblHeader.Text = "LOCAL GOVERNMENT UNIT OF IBA";
            // 
            // lblSubHeader
            // 
            lblSubHeader.AutoSize = true;
            lblSubHeader.Font = new Font("Segoe UI", 18F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblSubHeader.Location = new Point(290, 94);
            lblSubHeader.Name = "lblSubHeader";
            lblSubHeader.Size = new Size(531, 32);
            lblSubHeader.TabIndex = 1;
            lblSubHeader.Text = "CLIENT SATISFACTION MEASUREMENT FORM";
            // 
            // lblHelpText
            // 
            lblHelpText.AutoSize = true;
            lblHelpText.Font = new Font("Segoe UI", 12F, FontStyle.Italic, GraphicsUnit.Point, 0);
            lblHelpText.Location = new Point(464, 136);
            lblHelpText.Name = "lblHelpText";
            lblHelpText.Size = new Size(181, 21);
            lblHelpText.TabIndex = 2;
            lblHelpText.Text = "Help us serve you better!";
            // 
            // lblDescription
            // 
            lblDescription.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblDescription.Location = new Point(29, 186);
            lblDescription.Name = "lblDescription";
            lblDescription.Size = new Size(969, 73);
            lblDescription.TabIndex = 3;
            lblDescription.Text = resources.GetString("lblDescription.Text");
            // 
            // grpClientType
            // 
            grpClientType.Controls.Add(rdoBusiness);
            grpClientType.Controls.Add(rdoGovEmployee);
            grpClientType.Controls.Add(rdoGeneralPublic);
            grpClientType.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            grpClientType.Location = new Point(29, 259);
            grpClientType.Name = "grpClientType";
            grpClientType.Size = new Size(969, 61);
            grpClientType.TabIndex = 4;
            grpClientType.TabStop = false;
            grpClientType.Text = "URI NG KLIYENTE:";
            // 
            // rdoBusiness
            // 
            rdoBusiness.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            rdoBusiness.Location = new Point(370, 24);
            rdoBusiness.Name = "rdoBusiness";
            rdoBusiness.Size = new Size(240, 27);
            rdoBusiness.TabIndex = 2;
            rdoBusiness.Text = "Business or Private Organizations";
            rdoBusiness.UseVisualStyleBackColor = true;
            // 
            // rdoGovEmployee
            // 
            rdoGovEmployee.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            rdoGovEmployee.Location = new Point(168, 24);
            rdoGovEmployee.Name = "rdoGovEmployee";
            rdoGovEmployee.Size = new Size(180, 27);
            rdoGovEmployee.TabIndex = 1;
            rdoGovEmployee.Text = "Government Employee";
            rdoGovEmployee.UseVisualStyleBackColor = true;
            // 
            // rdoGeneralPublic
            // 
            rdoGeneralPublic.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            rdoGeneralPublic.Location = new Point(17, 24);
            rdoGeneralPublic.Name = "rdoGeneralPublic";
            rdoGeneralPublic.Size = new Size(145, 27);
            rdoGeneralPublic.TabIndex = 0;
            rdoGeneralPublic.Text = "General Public";
            rdoGeneralPublic.UseVisualStyleBackColor = true;
            // 
            // grpClientInfo
            // 
            grpClientInfo.Controls.Add(cbxOpisina);
            grpClientInfo.Controls.Add(dateTimePicker1);
            grpClientInfo.Controls.Add(txtEmployeeOffice);
            grpClientInfo.Controls.Add(lblEmployeeOffice);
            grpClientInfo.Controls.Add(txtService);
            grpClientInfo.Controls.Add(lblService);
            grpClientInfo.Controls.Add(lblPetsa);
            grpClientInfo.Controls.Add(lblOffice);
            grpClientInfo.Font = new Font("Segoe UI", 7.5F);
            grpClientInfo.Location = new Point(29, 373);
            grpClientInfo.Name = "grpClientInfo";
            grpClientInfo.Size = new Size(969, 74);
            grpClientInfo.TabIndex = 5;
            grpClientInfo.TabStop = false;
            // 
            // cbxOpisina
            // 
            cbxOpisina.Font = new Font("Segoe UI", 9.75F, FontStyle.Regular, GraphicsUnit.Point, 0);
            cbxOpisina.FormattingEnabled = true;
            cbxOpisina.Items.AddRange(new object[] { "Office of the Sangguniang Bayan", "Assessor's Office", "Engineering Office", "Office for Agricultural Services", "Local Youth Development Office", "Municipal Social Welfare and Development Office", "Irene Maniquiz Action Center", "Treasury Office", "Office of the Civil Registry", "Office on Health Services" });
            cbxOpisina.Location = new Point(19, 37);
            cbxOpisina.Name = "cbxOpisina";
            cbxOpisina.Size = new Size(266, 25);
            cbxOpisina.TabIndex = 9;
            // 
            // dateTimePicker1
            // 
            dateTimePicker1.CalendarFont = new Font("Segoe UI", 9.75F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dateTimePicker1.Font = new Font("Segoe UI", 9.75F, FontStyle.Regular, GraphicsUnit.Point, 0);
            dateTimePicker1.Location = new Point(298, 37);
            dateTimePicker1.Name = "dateTimePicker1";
            dateTimePicker1.Size = new Size(215, 25);
            dateTimePicker1.TabIndex = 8;
            // 
            // txtEmployeeOffice
            // 
            txtEmployeeOffice.BorderStyle = BorderStyle.FixedSingle;
            txtEmployeeOffice.Font = new Font("Segoe UI", 8F);
            txtEmployeeOffice.Location = new Point(730, 37);
            txtEmployeeOffice.Name = "txtEmployeeOffice";
            txtEmployeeOffice.Size = new Size(224, 22);
            txtEmployeeOffice.TabIndex = 7;
            // 
            // lblEmployeeOffice
            // 
            lblEmployeeOffice.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
            lblEmployeeOffice.Location = new Point(728, 17);
            lblEmployeeOffice.Name = "lblEmployeeOffice";
            lblEmployeeOffice.Size = new Size(207, 18);
            lblEmployeeOffice.TabIndex = 6;
            lblEmployeeOffice.Text = "PANGALAN NG EMPLEYADO:";
            // 
            // txtService
            // 
            txtService.BorderStyle = BorderStyle.FixedSingle;
            txtService.Font = new Font("Segoe UI", 8F);
            txtService.Location = new Point(535, 37);
            txtService.Name = "txtService";
            txtService.Size = new Size(184, 22);
            txtService.TabIndex = 5;
            // 
            // lblService
            // 
            lblService.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
            lblService.Location = new Point(535, 17);
            lblService.Name = "lblService";
            lblService.Size = new Size(129, 18);
            lblService.TabIndex = 4;
            lblService.Text = "URI NG SERBISYO:";
            // 
            // lblPetsa
            // 
            lblPetsa.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
            lblPetsa.Location = new Point(298, 17);
            lblPetsa.Name = "lblPetsa";
            lblPetsa.Size = new Size(50, 15);
            lblPetsa.TabIndex = 2;
            lblPetsa.Text = "PETSA:";
            // 
            // lblOffice
            // 
            lblOffice.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblOffice.Location = new Point(15, 17);
            lblOffice.Name = "lblOffice";
            lblOffice.Size = new Size(184, 18);
            lblOffice.TabIndex = 0;
            lblOffice.Text = "OPISINANG PINUNTAHAN:";
            // 
            // grpCitizensCharter
            // 
            grpCitizensCharter.Controls.Add(checkBox2);
            grpCitizensCharter.Controls.Add(checkBox3);
            grpCitizensCharter.Controls.Add(checkBox4);
            grpCitizensCharter.Controls.Add(checkBox5);
            grpCitizensCharter.Controls.Add(label4);
            grpCitizensCharter.Controls.Add(chkCC2_5);
            grpCitizensCharter.Controls.Add(chkCC2_4);
            grpCitizensCharter.Controls.Add(chkCC2_3);
            grpCitizensCharter.Controls.Add(chkCC2_2);
            grpCitizensCharter.Controls.Add(chkCC2_1);
            grpCitizensCharter.Controls.Add(lblCC2);
            grpCitizensCharter.Controls.Add(chkCC1_4);
            grpCitizensCharter.Controls.Add(chkCC1_3);
            grpCitizensCharter.Controls.Add(chkCC1_2);
            grpCitizensCharter.Controls.Add(chkCC1_1);
            grpCitizensCharter.Controls.Add(lblCC1);
            grpCitizensCharter.Controls.Add(lblCCInstruction);
            grpCitizensCharter.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            grpCitizensCharter.Location = new Point(29, 453);
            grpCitizensCharter.Name = "grpCitizensCharter";
            grpCitizensCharter.Size = new Size(969, 434);
            grpCitizensCharter.TabIndex = 6;
            grpCitizensCharter.TabStop = false;
            grpCitizensCharter.Text = "Citizen's Charter Awareness";
            // 
            // checkBox2
            // 
            checkBox2.Font = new Font("Segoe UI", 9.75F);
            checkBox2.Location = new Point(27, 400);
            checkBox2.Name = "checkBox2";
            checkBox2.Size = new Size(150, 18);
            checkBox2.TabIndex = 16;
            checkBox2.Text = "4. N/A";
            checkBox2.UseVisualStyleBackColor = true;
            // 
            // checkBox3
            // 
            checkBox3.Font = new Font("Segoe UI", 9.75F);
            checkBox3.Location = new Point(27, 378);
            checkBox3.Name = "checkBox3";
            checkBox3.Size = new Size(150, 18);
            checkBox3.TabIndex = 15;
            checkBox3.Text = "3. Hindi nakatulong";
            checkBox3.UseVisualStyleBackColor = true;
            // 
            // checkBox4
            // 
            checkBox4.Font = new Font("Segoe UI", 9.75F);
            checkBox4.Location = new Point(27, 356);
            checkBox4.Name = "checkBox4";
            checkBox4.Size = new Size(172, 18);
            checkBox4.TabIndex = 14;
            checkBox4.Text = "2. Medyo nakakatulong";
            checkBox4.UseVisualStyleBackColor = true;
            // 
            // checkBox5
            // 
            checkBox5.Font = new Font("Segoe UI", 9.75F);
            checkBox5.Location = new Point(27, 334);
            checkBox5.Name = "checkBox5";
            checkBox5.Size = new Size(172, 18);
            checkBox5.TabIndex = 13;
            checkBox5.Text = "1. Lubos na nakatulong";
            checkBox5.UseVisualStyleBackColor = true;
            // 
            // label4
            // 
            label4.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label4.Location = new Point(12, 310);
            label4.Name = "label4";
            label4.Size = new Size(888, 29);
            label4.TabIndex = 12;
            label4.Text = "CC3 Kung ikay ay may kamalayan sa Citizen's Charter (sagot sa 1-3 sa CC1), paano nakatulong sa iyo ang CC ng opisina sa iyong transaksiyon?\r\n";
            // 
            // chkCC2_5
            // 
            chkCC2_5.Font = new Font("Segoe UI", 9.75F);
            chkCC2_5.Location = new Point(200, 287);
            chkCC2_5.Name = "chkCC2_5";
            chkCC2_5.Size = new Size(70, 18);
            chkCC2_5.TabIndex = 11;
            chkCC2_5.Text = "5. N/A";
            chkCC2_5.UseVisualStyleBackColor = true;
            // 
            // chkCC2_4
            // 
            chkCC2_4.Font = new Font("Segoe UI", 9.75F);
            chkCC2_4.Location = new Point(30, 289);
            chkCC2_4.Name = "chkCC2_4";
            chkCC2_4.Size = new Size(150, 18);
            chkCC2_4.TabIndex = 10;
            chkCC2_4.Text = "4. Hindi Nakikita";
            chkCC2_4.UseVisualStyleBackColor = true;
            // 
            // chkCC2_3
            // 
            chkCC2_3.Font = new Font("Segoe UI", 9.75F);
            chkCC2_3.Location = new Point(30, 267);
            chkCC2_3.Name = "chkCC2_3";
            chkCC2_3.Size = new Size(150, 18);
            chkCC2_3.TabIndex = 9;
            chkCC2_3.Text = "3. Mahirap Makita";
            chkCC2_3.UseVisualStyleBackColor = true;
            // 
            // chkCC2_2
            // 
            chkCC2_2.Font = new Font("Segoe UI", 9.75F);
            chkCC2_2.Location = new Point(30, 245);
            chkCC2_2.Name = "chkCC2_2";
            chkCC2_2.Size = new Size(150, 18);
            chkCC2_2.TabIndex = 8;
            chkCC2_2.Text = "2. Medyo Nakikita";
            chkCC2_2.UseVisualStyleBackColor = true;
            // 
            // chkCC2_1
            // 
            chkCC2_1.Font = new Font("Segoe UI", 9.75F);
            chkCC2_1.Location = new Point(30, 223);
            chkCC2_1.Name = "chkCC2_1";
            chkCC2_1.Size = new Size(150, 18);
            chkCC2_1.TabIndex = 7;
            chkCC2_1.Text = "1. Madaling Makita";
            chkCC2_1.UseVisualStyleBackColor = true;
            // 
            // lblCC2
            // 
            lblCC2.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblCC2.Location = new Point(15, 199);
            lblCC2.Name = "lblCC2";
            lblCC2.Size = new Size(850, 29);
            lblCC2.TabIndex = 6;
            lblCC2.Text = "CC2  Kung ikaw ay may kamalayan sa Citizen's Charter (sagot sa 1-3 sa CC1), msasabi mo ba na ang CC ng opisinang ito ay...?";
            // 
            // chkCC1_4
            // 
            chkCC1_4.Font = new Font("Segoe UI", 9.75F);
            chkCC1_4.Location = new Point(30, 175);
            chkCC1_4.Name = "chkCC1_4";
            chkCC1_4.Size = new Size(500, 18);
            chkCC1_4.TabIndex = 5;
            chkCC1_4.Text = "4. Hindi ko alam ang tungkol sa CC at hindi ko ito nakikita sa mga opisina.";
            chkCC1_4.UseVisualStyleBackColor = true;
            // 
            // chkCC1_3
            // 
            chkCC1_3.Font = new Font("Segoe UI", 9.75F);
            chkCC1_3.Location = new Point(30, 153);
            chkCC1_3.Name = "chkCC1_3";
            chkCC1_3.Size = new Size(500, 18);
            chkCC1_3.TabIndex = 4;
            chkCC1_3.Text = "3. Nalalaman ko lamang ang tungkol sa CC ng Makita ko ito sa mga opisina.";
            chkCC1_3.UseVisualStyleBackColor = true;
            // 
            // chkCC1_2
            // 
            chkCC1_2.Font = new Font("Segoe UI", 9.75F);
            chkCC1_2.Location = new Point(30, 131);
            chkCC1_2.Name = "chkCC1_2";
            chkCC1_2.Size = new Size(450, 18);
            chkCC1_2.TabIndex = 3;
            chkCC1_2.Text = "2. Alam ko ang tungkol sa CC pero hindi ko ito nakikita sa mga opisina.";
            chkCC1_2.UseVisualStyleBackColor = true;
            // 
            // chkCC1_1
            // 
            chkCC1_1.Font = new Font("Segoe UI", 9.75F);
            chkCC1_1.Location = new Point(30, 109);
            chkCC1_1.Name = "chkCC1_1";
            chkCC1_1.Size = new Size(450, 18);
            chkCC1_1.TabIndex = 2;
            chkCC1_1.Text = "1. Alam ko ang tungkol sa CC at nakikita ko ito sa mga opisina.";
            chkCC1_1.UseVisualStyleBackColor = true;
            // 
            // lblCC1
            // 
            lblCC1.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblCC1.Location = new Point(15, 87);
            lblCC1.Name = "lblCC1";
            lblCC1.Size = new Size(362, 24);
            lblCC1.TabIndex = 1;
            lblCC1.Text = "CC1  Ano ang iyong kamalayan sa Citizen's Charter?";
            // 
            // lblCCInstruction
            // 
            lblCCInstruction.Font = new Font("Segoe UI", 9.75F, FontStyle.Regular, GraphicsUnit.Point, 0);
            lblCCInstruction.Location = new Point(15, 27);
            lblCCInstruction.Name = "lblCCInstruction";
            lblCCInstruction.Size = new Size(870, 56);
            lblCCInstruction.TabIndex = 0;
            lblCCInstruction.Text = resources.GetString("lblCCInstruction.Text");
            // 
            // lblService1
            // 
            lblService1.Font = new Font("Segoe UI", 9.75F);
            lblService1.Location = new Point(6, 144);
            lblService1.Name = "lblService1";
            lblService1.Size = new Size(397, 44);
            lblService1.TabIndex = 1;
            lblService1.Text = "1. Maagap sa pagtugon sa impormasyon o serbisyong hinihingi.\r\n    (Responsiveness)";
            lblService1.Click += lblService1_Click;
            // 
            // lblService2
            // 
            lblService2.Font = new Font("Segoe UI", 9.75F);
            lblService2.Location = new Point(6, 188);
            lblService2.Name = "lblService2";
            lblService2.Size = new Size(371, 50);
            lblService2.TabIndex = 2;
            lblService2.Text = "2. Maasahan ba ang serbisyong naibigay ng opisina?\r\n    (Reliability)";
            // 
            // lblService6
            // 
            lblService6.Font = new Font("Segoe UI", 9.75F);
            lblService6.Location = new Point(6, 395);
            lblService6.Name = "lblService6";
            lblService6.Size = new Size(377, 59);
            lblService6.TabIndex = 6;
            lblService6.Text = "6. Nagilingkod ba ng buong katapatan at mataas na integridad\r\n    ang serbisyong naibigay? (Integrity)";
            // 
            // grpComplaints
            // 
            grpComplaints.Controls.Add(txtComment);
            grpComplaints.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            grpComplaints.Location = new Point(30, 1379);
            grpComplaints.Name = "grpComplaints";
            grpComplaints.Size = new Size(969, 94);
            grpComplaints.TabIndex = 8;
            grpComplaints.TabStop = false;
            grpComplaints.Text = "REKLAMO O MUNGKAHI PARA MAPABUTI ANG AMING SERBISYO (OPTIONAL)";
            // 
            // txtComment
            // 
            txtComment.BorderStyle = BorderStyle.FixedSingle;
            txtComment.Font = new Font("Segoe UI", 8F);
            txtComment.Location = new Point(15, 20);
            txtComment.Multiline = true;
            txtComment.Name = "txtComment";
            txtComment.Size = new Size(938, 58);
            txtComment.TabIndex = 0;
            // 
            // grpContactInfo
            // 
            grpContactInfo.Controls.Add(txtContactInfo);
            grpContactInfo.Font = new Font("Segoe UI", 9F, FontStyle.Bold, GraphicsUnit.Point, 0);
            grpContactInfo.Location = new Point(30, 1498);
            grpContactInfo.Name = "grpContactInfo";
            grpContactInfo.Size = new Size(969, 79);
            grpContactInfo.TabIndex = 9;
            grpContactInfo.TabStop = false;
            grpContactInfo.Text = "NAME, EMAIL ADDRESS & TELEPHONE NO. (OPTIONAL)";
            // 
            // txtContactInfo
            // 
            txtContactInfo.BorderStyle = BorderStyle.FixedSingle;
            txtContactInfo.Font = new Font("Segoe UI", 8F);
            txtContactInfo.Location = new Point(11, 34);
            txtContactInfo.Name = "txtContactInfo";
            txtContactInfo.Size = new Size(942, 22);
            txtContactInfo.TabIndex = 0;
            // 
            // pictureBox1
            // 
            pictureBox1.Image = Properties.Resources.lguibalogo;
            pictureBox1.Location = new Point(131, 26);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(153, 143);
            pictureBox1.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox1.TabIndex = 14;
            pictureBox1.TabStop = false;
            // 
            // groupBox1
            // 
            groupBox1.Controls.Add(txtEdad);
            groupBox1.Controls.Add(label3);
            groupBox1.Controls.Add(rdoBabae);
            groupBox1.Controls.Add(rdoLalaki);
            groupBox1.Controls.Add(label2);
            groupBox1.Controls.Add(txtTirahan);
            groupBox1.Controls.Add(label1);
            groupBox1.FlatStyle = FlatStyle.Flat;
            groupBox1.Location = new Point(29, 321);
            groupBox1.Name = "groupBox1";
            groupBox1.Size = new Size(969, 54);
            groupBox1.TabIndex = 15;
            groupBox1.TabStop = false;
            // 
            // txtEdad
            // 
            txtEdad.BorderStyle = BorderStyle.FixedSingle;
            txtEdad.Location = new Point(805, 19);
            txtEdad.Name = "txtEdad";
            txtEdad.Size = new Size(73, 23);
            txtEdad.TabIndex = 15;
            // 
            // label3
            // 
            label3.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label3.Location = new Point(754, 21);
            label3.Name = "label3";
            label3.Size = new Size(83, 21);
            label3.TabIndex = 14;
            label3.Text = "EDAD:";
            // 
            // rdoBabae
            // 
            rdoBabae.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            rdoBabae.Location = new Point(618, 16);
            rdoBabae.Name = "rdoBabae";
            rdoBabae.Size = new Size(79, 27);
            rdoBabae.TabIndex = 13;
            rdoBabae.Text = "Babae";
            rdoBabae.UseVisualStyleBackColor = true;
            // 
            // rdoLalaki
            // 
            rdoLalaki.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 0);
            rdoLalaki.Location = new Point(545, 16);
            rdoLalaki.Name = "rdoLalaki";
            rdoLalaki.Size = new Size(67, 27);
            rdoLalaki.TabIndex = 3;
            rdoLalaki.Text = "Lalaki";
            rdoLalaki.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            label2.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label2.Location = new Point(456, 20);
            label2.Name = "label2";
            label2.Size = new Size(83, 21);
            label2.TabIndex = 12;
            label2.Text = "KASARIAN:";
            // 
            // txtTirahan
            // 
            txtTirahan.BorderStyle = BorderStyle.FixedSingle;
            txtTirahan.Location = new Point(94, 19);
            txtTirahan.Name = "txtTirahan";
            txtTirahan.Size = new Size(320, 23);
            txtTirahan.TabIndex = 11;
            // 
            // label1
            // 
            label1.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label1.Location = new Point(19, 20);
            label1.Name = "label1";
            label1.Size = new Size(71, 21);
            label1.TabIndex = 10;
            label1.Text = "TIRAHAN:";
            // 
            // lblSatisfactionInstruction
            // 
            lblSatisfactionInstruction.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            lblSatisfactionInstruction.Location = new Point(6, 48);
            lblSatisfactionInstruction.Name = "lblSatisfactionInstruction";
            lblSatisfactionInstruction.Size = new Size(408, 51);
            lblSatisfactionInstruction.TabIndex = 0;
            lblSatisfactionInstruction.Text = "Markahan ng tsek (✓) ang antas ng iyong kasiyahan sa\r\nserbisyong binigay sa iyo.";
            lblSatisfactionInstruction.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lblService3
            // 
            lblService3.Font = new Font("Segoe UI", 9.75F);
            lblService3.Location = new Point(6, 235);
            lblService3.Name = "lblService3";
            lblService3.Size = new Size(375, 51);
            lblService3.TabIndex = 3;
            lblService3.Text = "3. Ang tanggapan ay may angkop at maayos na pasilidad.\r\n    (Access and Facilities)";
            // 
            // lblService4
            // 
            lblService4.Font = new Font("Segoe UI", 9.75F);
            lblService4.Location = new Point(6, 283);
            lblService4.Name = "lblService4";
            lblService4.Size = new Size(380, 56);
            lblService4.TabIndex = 4;
            lblService4.Text = "4. Ang empleyadong tumugon ay magalang at may malinaw at\r\n    madaling maunawaan na pagpapaliwanag. (Communication)";
            // 
            // lblService5
            // 
            lblService5.Font = new Font("Segoe UI", 9.75F);
            lblService5.Location = new Point(11, 339);
            lblService5.Name = "lblService5";
            lblService5.Size = new Size(373, 49);
            lblService5.TabIndex = 5;
            lblService5.Text = "5. Sapat ba at ayon ang halaga na ibinayad katumbas ng\r\n    serbisyong naibigay? (Costs)";
            // 
            // lblRating5
            // 
            lblRating5.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            lblRating5.Location = new Point(11, 25);
            lblRating5.Name = "lblRating5";
            lblRating5.Size = new Size(77, 32);
            lblRating5.TabIndex = 7;
            lblRating5.Text = "LUBOS NA\r\nNASIYAHAN\r\n\r\n";
            lblRating5.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lblRating4
            // 
            lblRating4.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            lblRating4.Location = new Point(9, 28);
            lblRating4.Name = "lblRating4";
            lblRating4.Size = new Size(75, 22);
            lblRating4.TabIndex = 8;
            lblRating4.Text = "NASIYAHAN\r\n\r\n\r\n";
            lblRating4.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lblRating3
            // 
            lblRating3.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            lblRating3.Location = new Point(6, 19);
            lblRating3.Name = "lblRating3";
            lblRating3.Size = new Size(87, 50);
            lblRating3.TabIndex = 9;
            lblRating3.Text = "NI NASIYAHAN\r\nO HINDI\r\nNASIYAHAN\r\n\r\n";
            lblRating3.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lblRating2
            // 
            lblRating2.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            lblRating2.Location = new Point(8, 21);
            lblRating2.Name = "lblRating2";
            lblRating2.Size = new Size(87, 43);
            lblRating2.TabIndex = 10;
            lblRating2.Text = "HINDI\r\nNASIYAHAN\r\n";
            lblRating2.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // lblRating1
            // 
            lblRating1.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            lblRating1.Location = new Point(18, 15);
            lblRating1.Name = "lblRating1";
            lblRating1.Size = new Size(66, 50);
            lblRating1.TabIndex = 11;
            lblRating1.Text = "LUBOS NA\r\nHINDI\r\nNASIYAHAN\r\n";
            lblRating1.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // grpSatisfaction
            // 
            grpSatisfaction.Controls.Add(gbxIntegrity);
            grpSatisfaction.Controls.Add(gbxCost);
            grpSatisfaction.Controls.Add(gbxCommunication);
            grpSatisfaction.Controls.Add(gbxFacilities);
            grpSatisfaction.Controls.Add(gbxReliability);
            grpSatisfaction.Controls.Add(gbxResponsiveness);
            grpSatisfaction.Controls.Add(lblService6);
            grpSatisfaction.Controls.Add(lblService5);
            grpSatisfaction.Controls.Add(lblService4);
            grpSatisfaction.Controls.Add(lblService3);
            grpSatisfaction.Controls.Add(lblService2);
            grpSatisfaction.Controls.Add(lblService1);
            grpSatisfaction.Font = new Font("Segoe UI", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            grpSatisfaction.Location = new Point(30, 905);
            grpSatisfaction.Name = "grpSatisfaction";
            grpSatisfaction.Size = new Size(969, 465);
            grpSatisfaction.TabIndex = 7;
            grpSatisfaction.TabStop = false;
            // 
            // gbxIntegrity
            // 
            gbxIntegrity.Controls.Add(cbxIntegrity0);
            gbxIntegrity.Controls.Add(cbxIntegrity1);
            gbxIntegrity.Controls.Add(cbxIntegrity2);
            gbxIntegrity.Controls.Add(cbxIntegrity3);
            gbxIntegrity.Controls.Add(cbxIntegrity4);
            gbxIntegrity.Controls.Add(cbxIntegrity5);
            gbxIntegrity.Location = new Point(396, 382);
            gbxIntegrity.Name = "gbxIntegrity";
            gbxIntegrity.Size = new Size(573, 72);
            gbxIntegrity.TabIndex = 23;
            gbxIntegrity.TabStop = false;
            // 
            // cbxIntegrity0
            // 
            cbxIntegrity0.AutoSize = true;
            cbxIntegrity0.Location = new Point(523, 38);
            cbxIntegrity0.Name = "cbxIntegrity0";
            cbxIntegrity0.Size = new Size(15, 14);
            cbxIntegrity0.TabIndex = 12;
            cbxIntegrity0.UseVisualStyleBackColor = true;
            // 
            // cbxIntegrity1
            // 
            cbxIntegrity1.AutoSize = true;
            cbxIntegrity1.Location = new Point(433, 38);
            cbxIntegrity1.Name = "cbxIntegrity1";
            cbxIntegrity1.Size = new Size(15, 14);
            cbxIntegrity1.TabIndex = 11;
            cbxIntegrity1.UseVisualStyleBackColor = true;
            // 
            // cbxIntegrity2
            // 
            cbxIntegrity2.AutoSize = true;
            cbxIntegrity2.Location = new Point(338, 38);
            cbxIntegrity2.Name = "cbxIntegrity2";
            cbxIntegrity2.Size = new Size(15, 14);
            cbxIntegrity2.TabIndex = 10;
            cbxIntegrity2.UseVisualStyleBackColor = true;
            // 
            // cbxIntegrity3
            // 
            cbxIntegrity3.AutoSize = true;
            cbxIntegrity3.Location = new Point(237, 38);
            cbxIntegrity3.Name = "cbxIntegrity3";
            cbxIntegrity3.Size = new Size(15, 14);
            cbxIntegrity3.TabIndex = 9;
            cbxIntegrity3.UseVisualStyleBackColor = true;
            // 
            // cbxIntegrity4
            // 
            cbxIntegrity4.AutoSize = true;
            cbxIntegrity4.Location = new Point(138, 38);
            cbxIntegrity4.Name = "cbxIntegrity4";
            cbxIntegrity4.Size = new Size(15, 14);
            cbxIntegrity4.TabIndex = 8;
            cbxIntegrity4.UseVisualStyleBackColor = true;
            // 
            // cbxIntegrity5
            // 
            cbxIntegrity5.AutoSize = true;
            cbxIntegrity5.Location = new Point(38, 38);
            cbxIntegrity5.Name = "cbxIntegrity5";
            cbxIntegrity5.Size = new Size(15, 14);
            cbxIntegrity5.TabIndex = 7;
            cbxIntegrity5.UseVisualStyleBackColor = true;
            // 
            // gbxCost
            // 
            gbxCost.Controls.Add(groupBox8);
            gbxCost.Controls.Add(cbxCosts0);
            gbxCost.Controls.Add(cbxCosts1);
            gbxCost.Controls.Add(cbxCosts2);
            gbxCost.Controls.Add(cbxCosts3);
            gbxCost.Controls.Add(cbxCosts4);
            gbxCost.Controls.Add(cbxCosts5);
            gbxCost.Location = new Point(396, 325);
            gbxCost.Name = "gbxCost";
            gbxCost.Size = new Size(573, 73);
            gbxCost.TabIndex = 16;
            gbxCost.TabStop = false;
            // 
            // groupBox8
            // 
            groupBox8.Controls.Add(checkBox29);
            groupBox8.Controls.Add(checkBox30);
            groupBox8.Controls.Add(checkBox31);
            groupBox8.Controls.Add(checkBox32);
            groupBox8.Controls.Add(checkBox33);
            groupBox8.Controls.Add(checkBox34);
            groupBox8.Location = new Point(1, 62);
            groupBox8.Name = "groupBox8";
            groupBox8.Size = new Size(572, 81);
            groupBox8.TabIndex = 17;
            groupBox8.TabStop = false;
            // 
            // checkBox29
            // 
            checkBox29.AutoSize = true;
            checkBox29.Location = new Point(523, 40);
            checkBox29.Name = "checkBox29";
            checkBox29.Size = new Size(15, 14);
            checkBox29.TabIndex = 12;
            checkBox29.UseVisualStyleBackColor = true;
            // 
            // checkBox30
            // 
            checkBox30.AutoSize = true;
            checkBox30.Location = new Point(428, 42);
            checkBox30.Name = "checkBox30";
            checkBox30.Size = new Size(15, 14);
            checkBox30.TabIndex = 11;
            checkBox30.UseVisualStyleBackColor = true;
            // 
            // checkBox31
            // 
            checkBox31.AutoSize = true;
            checkBox31.Location = new Point(338, 42);
            checkBox31.Name = "checkBox31";
            checkBox31.Size = new Size(15, 14);
            checkBox31.TabIndex = 10;
            checkBox31.UseVisualStyleBackColor = true;
            // 
            // checkBox32
            // 
            checkBox32.AutoSize = true;
            checkBox32.Location = new Point(237, 40);
            checkBox32.Name = "checkBox32";
            checkBox32.Size = new Size(15, 14);
            checkBox32.TabIndex = 9;
            checkBox32.UseVisualStyleBackColor = true;
            // 
            // checkBox33
            // 
            checkBox33.AutoSize = true;
            checkBox33.Location = new Point(138, 40);
            checkBox33.Name = "checkBox33";
            checkBox33.Size = new Size(15, 14);
            checkBox33.TabIndex = 8;
            checkBox33.UseVisualStyleBackColor = true;
            // 
            // checkBox34
            // 
            checkBox34.AutoSize = true;
            checkBox34.Location = new Point(37, 40);
            checkBox34.Name = "checkBox34";
            checkBox34.Size = new Size(15, 14);
            checkBox34.TabIndex = 7;
            checkBox34.UseVisualStyleBackColor = true;
            // 
            // cbxCosts0
            // 
            cbxCosts0.AutoSize = true;
            cbxCosts0.Location = new Point(524, 37);
            cbxCosts0.Name = "cbxCosts0";
            cbxCosts0.Size = new Size(15, 14);
            cbxCosts0.TabIndex = 12;
            cbxCosts0.UseVisualStyleBackColor = true;
            // 
            // cbxCosts1
            // 
            cbxCosts1.AutoSize = true;
            cbxCosts1.Location = new Point(433, 37);
            cbxCosts1.Name = "cbxCosts1";
            cbxCosts1.Size = new Size(15, 14);
            cbxCosts1.TabIndex = 11;
            cbxCosts1.UseVisualStyleBackColor = true;
            // 
            // cbxCosts2
            // 
            cbxCosts2.AutoSize = true;
            cbxCosts2.Location = new Point(338, 37);
            cbxCosts2.Name = "cbxCosts2";
            cbxCosts2.Size = new Size(15, 14);
            cbxCosts2.TabIndex = 10;
            cbxCosts2.UseVisualStyleBackColor = true;
            // 
            // cbxCosts3
            // 
            cbxCosts3.AutoSize = true;
            cbxCosts3.Location = new Point(237, 37);
            cbxCosts3.Name = "cbxCosts3";
            cbxCosts3.Size = new Size(15, 14);
            cbxCosts3.TabIndex = 9;
            cbxCosts3.UseVisualStyleBackColor = true;
            // 
            // cbxCosts4
            // 
            cbxCosts4.AutoSize = true;
            cbxCosts4.Location = new Point(139, 37);
            cbxCosts4.Name = "cbxCosts4";
            cbxCosts4.Size = new Size(15, 14);
            cbxCosts4.TabIndex = 8;
            cbxCosts4.UseVisualStyleBackColor = true;
            // 
            // cbxCosts5
            // 
            cbxCosts5.AutoSize = true;
            cbxCosts5.Location = new Point(38, 37);
            cbxCosts5.Name = "cbxCosts5";
            cbxCosts5.Size = new Size(15, 14);
            cbxCosts5.TabIndex = 7;
            cbxCosts5.UseVisualStyleBackColor = true;
            // 
            // gbxCommunication
            // 
            gbxCommunication.Controls.Add(cbxCommunication0);
            gbxCommunication.Controls.Add(cbxCommunication1);
            gbxCommunication.Controls.Add(cbxCommunication2);
            gbxCommunication.Controls.Add(cbxCommunication3);
            gbxCommunication.Controls.Add(cbxCommunication4);
            gbxCommunication.Controls.Add(cbxCommunication5);
            gbxCommunication.Location = new Point(396, 273);
            gbxCommunication.Name = "gbxCommunication";
            gbxCommunication.Size = new Size(573, 70);
            gbxCommunication.TabIndex = 16;
            gbxCommunication.TabStop = false;
            // 
            // cbxCommunication0
            // 
            cbxCommunication0.AutoSize = true;
            cbxCommunication0.Location = new Point(524, 32);
            cbxCommunication0.Name = "cbxCommunication0";
            cbxCommunication0.Size = new Size(15, 14);
            cbxCommunication0.TabIndex = 12;
            cbxCommunication0.UseVisualStyleBackColor = true;
            // 
            // cbxCommunication1
            // 
            cbxCommunication1.AutoSize = true;
            cbxCommunication1.Location = new Point(433, 32);
            cbxCommunication1.Name = "cbxCommunication1";
            cbxCommunication1.Size = new Size(15, 14);
            cbxCommunication1.TabIndex = 11;
            cbxCommunication1.UseVisualStyleBackColor = true;
            // 
            // cbxCommunication2
            // 
            cbxCommunication2.AutoSize = true;
            cbxCommunication2.Location = new Point(338, 32);
            cbxCommunication2.Name = "cbxCommunication2";
            cbxCommunication2.Size = new Size(15, 14);
            cbxCommunication2.TabIndex = 10;
            cbxCommunication2.UseVisualStyleBackColor = true;
            // 
            // cbxCommunication3
            // 
            cbxCommunication3.AutoSize = true;
            cbxCommunication3.Location = new Point(237, 32);
            cbxCommunication3.Name = "cbxCommunication3";
            cbxCommunication3.Size = new Size(15, 14);
            cbxCommunication3.TabIndex = 9;
            cbxCommunication3.UseVisualStyleBackColor = true;
            // 
            // cbxCommunication4
            // 
            cbxCommunication4.AutoSize = true;
            cbxCommunication4.Location = new Point(138, 32);
            cbxCommunication4.Name = "cbxCommunication4";
            cbxCommunication4.Size = new Size(15, 14);
            cbxCommunication4.TabIndex = 8;
            cbxCommunication4.UseVisualStyleBackColor = true;
            // 
            // cbxCommunication5
            // 
            cbxCommunication5.AutoSize = true;
            cbxCommunication5.Location = new Point(38, 32);
            cbxCommunication5.Name = "cbxCommunication5";
            cbxCommunication5.Size = new Size(15, 14);
            cbxCommunication5.TabIndex = 7;
            cbxCommunication5.UseVisualStyleBackColor = true;
            // 
            // gbxFacilities
            // 
            gbxFacilities.Controls.Add(cbxFacilities0);
            gbxFacilities.Controls.Add(cbxFacilities1);
            gbxFacilities.Controls.Add(cbxFacilities2);
            gbxFacilities.Controls.Add(cbxFacilities3);
            gbxFacilities.Controls.Add(cbxFacilities4);
            gbxFacilities.Controls.Add(cbxFacilities5);
            gbxFacilities.Location = new Point(396, 220);
            gbxFacilities.Name = "gbxFacilities";
            gbxFacilities.Size = new Size(573, 66);
            gbxFacilities.TabIndex = 15;
            gbxFacilities.TabStop = false;
            // 
            // cbxFacilities0
            // 
            cbxFacilities0.AutoSize = true;
            cbxFacilities0.Location = new Point(524, 33);
            cbxFacilities0.Name = "cbxFacilities0";
            cbxFacilities0.Size = new Size(15, 14);
            cbxFacilities0.TabIndex = 12;
            cbxFacilities0.UseVisualStyleBackColor = true;
            // 
            // cbxFacilities1
            // 
            cbxFacilities1.AutoSize = true;
            cbxFacilities1.Location = new Point(433, 33);
            cbxFacilities1.Name = "cbxFacilities1";
            cbxFacilities1.Size = new Size(15, 14);
            cbxFacilities1.TabIndex = 11;
            cbxFacilities1.UseVisualStyleBackColor = true;
            // 
            // cbxFacilities2
            // 
            cbxFacilities2.AutoSize = true;
            cbxFacilities2.Location = new Point(338, 33);
            cbxFacilities2.Name = "cbxFacilities2";
            cbxFacilities2.Size = new Size(15, 14);
            cbxFacilities2.TabIndex = 10;
            cbxFacilities2.UseVisualStyleBackColor = true;
            // 
            // cbxFacilities3
            // 
            cbxFacilities3.AutoSize = true;
            cbxFacilities3.Location = new Point(237, 33);
            cbxFacilities3.Name = "cbxFacilities3";
            cbxFacilities3.Size = new Size(15, 14);
            cbxFacilities3.TabIndex = 9;
            cbxFacilities3.UseVisualStyleBackColor = true;
            // 
            // cbxFacilities4
            // 
            cbxFacilities4.AutoSize = true;
            cbxFacilities4.Location = new Point(138, 33);
            cbxFacilities4.Name = "cbxFacilities4";
            cbxFacilities4.Size = new Size(15, 14);
            cbxFacilities4.TabIndex = 8;
            cbxFacilities4.UseVisualStyleBackColor = true;
            // 
            // cbxFacilities5
            // 
            cbxFacilities5.AutoSize = true;
            cbxFacilities5.Location = new Point(37, 33);
            cbxFacilities5.Name = "cbxFacilities5";
            cbxFacilities5.Size = new Size(15, 14);
            cbxFacilities5.TabIndex = 7;
            cbxFacilities5.UseVisualStyleBackColor = true;
            // 
            // gbxReliability
            // 
            gbxReliability.Controls.Add(cbxReliability0);
            gbxReliability.Controls.Add(cbxReliability1);
            gbxReliability.Controls.Add(cbxReliability2);
            gbxReliability.Controls.Add(cbxReliability3);
            gbxReliability.Controls.Add(cbxReliability4);
            gbxReliability.Controls.Add(cbxReliability5);
            gbxReliability.Location = new Point(397, 174);
            gbxReliability.Name = "gbxReliability";
            gbxReliability.Size = new Size(572, 64);
            gbxReliability.TabIndex = 14;
            gbxReliability.TabStop = false;
            // 
            // cbxReliability0
            // 
            cbxReliability0.AutoSize = true;
            cbxReliability0.Location = new Point(523, 26);
            cbxReliability0.Name = "cbxReliability0";
            cbxReliability0.Size = new Size(15, 14);
            cbxReliability0.TabIndex = 12;
            cbxReliability0.UseVisualStyleBackColor = true;
            // 
            // cbxReliability1
            // 
            cbxReliability1.AutoSize = true;
            cbxReliability1.Location = new Point(432, 26);
            cbxReliability1.Name = "cbxReliability1";
            cbxReliability1.Size = new Size(15, 14);
            cbxReliability1.TabIndex = 11;
            cbxReliability1.UseVisualStyleBackColor = true;
            // 
            // cbxReliability2
            // 
            cbxReliability2.AutoSize = true;
            cbxReliability2.Location = new Point(335, 26);
            cbxReliability2.Name = "cbxReliability2";
            cbxReliability2.Size = new Size(15, 14);
            cbxReliability2.TabIndex = 10;
            cbxReliability2.UseVisualStyleBackColor = true;
            // 
            // cbxReliability3
            // 
            cbxReliability3.AutoSize = true;
            cbxReliability3.Location = new Point(236, 26);
            cbxReliability3.Name = "cbxReliability3";
            cbxReliability3.Size = new Size(15, 14);
            cbxReliability3.TabIndex = 9;
            cbxReliability3.UseVisualStyleBackColor = true;
            // 
            // cbxReliability4
            // 
            cbxReliability4.AutoSize = true;
            cbxReliability4.Location = new Point(137, 26);
            cbxReliability4.Name = "cbxReliability4";
            cbxReliability4.Size = new Size(15, 14);
            cbxReliability4.TabIndex = 8;
            cbxReliability4.UseVisualStyleBackColor = true;
            // 
            // cbxReliability5
            // 
            cbxReliability5.AutoSize = true;
            cbxReliability5.Location = new Point(37, 26);
            cbxReliability5.Name = "cbxReliability5";
            cbxReliability5.Size = new Size(15, 14);
            cbxReliability5.TabIndex = 7;
            cbxReliability5.UseVisualStyleBackColor = true;
            // 
            // gbxResponsiveness
            // 
            gbxResponsiveness.Controls.Add(cbxResponsiveness0);
            gbxResponsiveness.Controls.Add(cbxResponsiveness1);
            gbxResponsiveness.Controls.Add(cbxResponsiveness2);
            gbxResponsiveness.Controls.Add(cbxResponsiveness3);
            gbxResponsiveness.Controls.Add(cbxResponsiveness4);
            gbxResponsiveness.Controls.Add(cbxResponsiveness5);
            gbxResponsiveness.Location = new Point(397, 115);
            gbxResponsiveness.Name = "gbxResponsiveness";
            gbxResponsiveness.Size = new Size(572, 66);
            gbxResponsiveness.TabIndex = 13;
            gbxResponsiveness.TabStop = false;
            // 
            // cbxResponsiveness0
            // 
            cbxResponsiveness0.AutoSize = true;
            cbxResponsiveness0.Location = new Point(522, 33);
            cbxResponsiveness0.Name = "cbxResponsiveness0";
            cbxResponsiveness0.Size = new Size(15, 14);
            cbxResponsiveness0.TabIndex = 12;
            cbxResponsiveness0.UseVisualStyleBackColor = true;
            // 
            // cbxResponsiveness1
            // 
            cbxResponsiveness1.AutoSize = true;
            cbxResponsiveness1.Location = new Point(432, 33);
            cbxResponsiveness1.Name = "cbxResponsiveness1";
            cbxResponsiveness1.Size = new Size(15, 14);
            cbxResponsiveness1.TabIndex = 11;
            cbxResponsiveness1.UseVisualStyleBackColor = true;
            // 
            // cbxResponsiveness2
            // 
            cbxResponsiveness2.AutoSize = true;
            cbxResponsiveness2.Location = new Point(335, 35);
            cbxResponsiveness2.Name = "cbxResponsiveness2";
            cbxResponsiveness2.Size = new Size(15, 14);
            cbxResponsiveness2.TabIndex = 10;
            cbxResponsiveness2.UseVisualStyleBackColor = true;
            // 
            // cbxResponsiveness3
            // 
            cbxResponsiveness3.AutoSize = true;
            cbxResponsiveness3.Location = new Point(236, 35);
            cbxResponsiveness3.Name = "cbxResponsiveness3";
            cbxResponsiveness3.Size = new Size(15, 14);
            cbxResponsiveness3.TabIndex = 9;
            cbxResponsiveness3.UseVisualStyleBackColor = true;
            // 
            // cbxResponsiveness4
            // 
            cbxResponsiveness4.AutoSize = true;
            cbxResponsiveness4.Location = new Point(137, 35);
            cbxResponsiveness4.Name = "cbxResponsiveness4";
            cbxResponsiveness4.Size = new Size(15, 14);
            cbxResponsiveness4.TabIndex = 8;
            cbxResponsiveness4.UseVisualStyleBackColor = true;
            // 
            // cbxResponsiveness5
            // 
            cbxResponsiveness5.AutoSize = true;
            cbxResponsiveness5.Location = new Point(37, 39);
            cbxResponsiveness5.Name = "cbxResponsiveness5";
            cbxResponsiveness5.Size = new Size(15, 14);
            cbxResponsiveness5.TabIndex = 7;
            cbxResponsiveness5.UseVisualStyleBackColor = true;
            // 
            // label5
            // 
            label5.Font = new Font("Segoe UI", 9F, FontStyle.Bold);
            label5.Location = new Point(185, 16);
            label5.Name = "label5";
            label5.Size = new Size(77, 32);
            label5.TabIndex = 17;
            label5.Text = "SERBISYO";
            label5.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // pictureBox6
            // 
            pictureBox6.Image = Properties.Resources.angry_7162069;
            pictureBox6.Location = new Point(20, 69);
            pictureBox6.Name = "pictureBox6";
            pictureBox6.Size = new Size(58, 52);
            pictureBox6.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox6.TabIndex = 16;
            pictureBox6.TabStop = false;
            // 
            // pictureBox5
            // 
            pictureBox5.Image = Properties.Resources.sad_7162102;
            pictureBox5.Location = new Point(26, 67);
            pictureBox5.Name = "pictureBox5";
            pictureBox5.Size = new Size(58, 52);
            pictureBox5.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox5.TabIndex = 15;
            pictureBox5.TabStop = false;
            // 
            // pictureBox4
            // 
            pictureBox4.Image = Properties.Resources.flat_7162080;
            pictureBox4.Location = new Point(25, 67);
            pictureBox4.Name = "pictureBox4";
            pictureBox4.Size = new Size(58, 52);
            pictureBox4.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox4.TabIndex = 14;
            pictureBox4.TabStop = false;
            // 
            // pictureBox3
            // 
            pictureBox3.Image = Properties.Resources.smile_7162105;
            pictureBox3.Location = new Point(21, 67);
            pictureBox3.Name = "pictureBox3";
            pictureBox3.Size = new Size(58, 52);
            pictureBox3.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox3.TabIndex = 13;
            pictureBox3.TabStop = false;
            // 
            // pictureBox2
            // 
            pictureBox2.Image = Properties.Resources.famous_7162078;
            pictureBox2.Location = new Point(18, 67);
            pictureBox2.Name = "pictureBox2";
            pictureBox2.Size = new Size(58, 52);
            pictureBox2.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBox2.TabIndex = 12;
            pictureBox2.TabStop = false;
            // 
            // groupBox2
            // 
            groupBox2.Controls.Add(groupBox7);
            groupBox2.Controls.Add(groupBox5);
            groupBox2.Controls.Add(groupBox4);
            groupBox2.Controls.Add(groupBox3);
            groupBox2.Controls.Add(label6);
            groupBox2.Controls.Add(label5);
            groupBox2.Controls.Add(lblSatisfactionInstruction);
            groupBox2.Location = new Point(30, 893);
            groupBox2.Name = "groupBox2";
            groupBox2.Size = new Size(969, 145);
            groupBox2.TabIndex = 18;
            groupBox2.TabStop = false;
            // 
            // groupBox7
            // 
            groupBox7.Controls.Add(label11);
            groupBox7.Controls.Add(lblRating1);
            groupBox7.Controls.Add(pictureBox6);
            groupBox7.Location = new Point(787, 0);
            groupBox7.Name = "groupBox7";
            groupBox7.Size = new Size(98, 145);
            groupBox7.TabIndex = 16;
            groupBox7.TabStop = false;
            // 
            // label11
            // 
            label11.AutoSize = true;
            label11.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label11.Location = new Point(42, 122);
            label11.Name = "label11";
            label11.Size = new Size(15, 17);
            label11.TabIndex = 17;
            label11.Text = "1";
            // 
            // groupBox5
            // 
            groupBox5.Controls.Add(label9);
            groupBox5.Controls.Add(pictureBox4);
            groupBox5.Controls.Add(lblRating3);
            groupBox5.Location = new Point(587, 0);
            groupBox5.Name = "groupBox5";
            groupBox5.Size = new Size(99, 145);
            groupBox5.TabIndex = 21;
            groupBox5.TabStop = false;
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label9.Location = new Point(46, 122);
            label9.Name = "label9";
            label9.Size = new Size(15, 17);
            label9.TabIndex = 15;
            label9.Text = "3";
            // 
            // groupBox4
            // 
            groupBox4.Controls.Add(label8);
            groupBox4.Controls.Add(pictureBox3);
            groupBox4.Controls.Add(lblRating4);
            groupBox4.Location = new Point(491, 0);
            groupBox4.Name = "groupBox4";
            groupBox4.Size = new Size(97, 145);
            groupBox4.TabIndex = 20;
            groupBox4.TabStop = false;
            // 
            // label8
            // 
            label8.AutoSize = true;
            label8.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label8.Location = new Point(44, 122);
            label8.Name = "label8";
            label8.Size = new Size(15, 17);
            label8.TabIndex = 14;
            label8.Text = "4";
            // 
            // groupBox3
            // 
            groupBox3.Controls.Add(label7);
            groupBox3.Controls.Add(pictureBox2);
            groupBox3.Controls.Add(lblRating5);
            groupBox3.Location = new Point(397, 0);
            groupBox3.Name = "groupBox3";
            groupBox3.Size = new Size(97, 145);
            groupBox3.TabIndex = 19;
            groupBox3.TabStop = false;
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label7.Location = new Point(37, 125);
            label7.Name = "label7";
            label7.Size = new Size(15, 17);
            label7.TabIndex = 13;
            label7.Text = "5";
            // 
            // label6
            // 
            label6.Font = new Font("Segoe UI", 8.25F, FontStyle.Bold);
            label6.Location = new Point(894, 48);
            label6.Name = "label6";
            label6.Size = new Size(69, 71);
            label6.TabIndex = 18;
            label6.Text = "N/A\r\nNot \r\nApplicable";
            label6.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // groupBox6
            // 
            groupBox6.Controls.Add(label10);
            groupBox6.Controls.Add(pictureBox5);
            groupBox6.Controls.Add(lblRating2);
            groupBox6.Location = new Point(715, 893);
            groupBox6.Name = "groupBox6";
            groupBox6.Size = new Size(104, 145);
            groupBox6.TabIndex = 22;
            groupBox6.TabStop = false;
            // 
            // label10
            // 
            label10.AutoSize = true;
            label10.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label10.Location = new Point(47, 122);
            label10.Name = "label10";
            label10.Size = new Size(15, 17);
            label10.TabIndex = 16;
            label10.Text = "2";
            // 
            // btnSubmit
            // 
            btnSubmit.BackColor = Color.DodgerBlue;
            btnSubmit.Font = new Font("Segoe UI", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 0);
            btnSubmit.ForeColor = Color.White;
            btnSubmit.Location = new Point(366, 1606);
            btnSubmit.Name = "btnSubmit";
            btnSubmit.Size = new Size(294, 71);
            btnSubmit.TabIndex = 23;
            btnSubmit.Text = "SUBMIT";
            btnSubmit.UseVisualStyleBackColor = false;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            AutoScroll = true;
            BackColor = Color.White;
            ClientSize = new Size(1023, 1701);
            Controls.Add(btnSubmit);
            Controls.Add(groupBox6);
            Controls.Add(groupBox2);
            Controls.Add(groupBox1);
            Controls.Add(pictureBox1);
            Controls.Add(grpContactInfo);
            Controls.Add(grpComplaints);
            Controls.Add(grpSatisfaction);
            Controls.Add(grpCitizensCharter);
            Controls.Add(grpClientInfo);
            Controls.Add(grpClientType);
            Controls.Add(lblDescription);
            Controls.Add(lblHelpText);
            Controls.Add(lblSubHeader);
            Controls.Add(lblHeader);
            FormBorderStyle = FormBorderStyle.FixedDialog;
            Name = "Form1";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Client Satisfaction Survey - Local Government Unit of Iba";
            grpClientType.ResumeLayout(false);
            grpClientInfo.ResumeLayout(false);
            grpClientInfo.PerformLayout();
            grpCitizensCharter.ResumeLayout(false);
            grpComplaints.ResumeLayout(false);
            grpComplaints.PerformLayout();
            grpContactInfo.ResumeLayout(false);
            grpContactInfo.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            groupBox1.ResumeLayout(false);
            groupBox1.PerformLayout();
            grpSatisfaction.ResumeLayout(false);
            gbxIntegrity.ResumeLayout(false);
            gbxIntegrity.PerformLayout();
            gbxCost.ResumeLayout(false);
            gbxCost.PerformLayout();
            groupBox8.ResumeLayout(false);
            groupBox8.PerformLayout();
            gbxCommunication.ResumeLayout(false);
            gbxCommunication.PerformLayout();
            gbxFacilities.ResumeLayout(false);
            gbxFacilities.PerformLayout();
            gbxReliability.ResumeLayout(false);
            gbxReliability.PerformLayout();
            gbxResponsiveness.ResumeLayout(false);
            gbxResponsiveness.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox6).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox5).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox4).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
            groupBox2.ResumeLayout(false);
            groupBox7.ResumeLayout(false);
            groupBox7.PerformLayout();
            groupBox5.ResumeLayout(false);
            groupBox5.PerformLayout();
            groupBox4.ResumeLayout(false);
            groupBox4.PerformLayout();
            groupBox3.ResumeLayout(false);
            groupBox3.PerformLayout();
            groupBox6.ResumeLayout(false);
            groupBox6.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        private PictureBox pictureBox1;
        private ComboBox cbxOpisina;
        private DateTimePicker dateTimePicker1;
        private GroupBox groupBox1;
        private Label label1;
        private TextBox txtEdad;
        private Label label3;
        private RadioButton rdoBabae;
        private RadioButton rdoLalaki;
        private Label label2;
        private TextBox txtTirahan;
        private Label lblResult;
        private Label lblSatisfactionInstruction;
        private Label lblService1;
        private Label lblService2;
        private Label lblService3;
        private Label lblService4;
        private Label lblService5;
        private Label lblRating5;
        private Label lblRating4;
        private Label lblRating3;
        private Label lblRating2;
        private Label lblRating1;
        public GroupBox grpSatisfaction;
        private CheckBox checkBox2;
        private CheckBox checkBox3;
        private CheckBox checkBox4;
        private CheckBox checkBox5;
        private Label label4;
        private PictureBox pictureBox6;
        private PictureBox pictureBox5;
        private PictureBox pictureBox4;
        private PictureBox pictureBox3;
        private PictureBox pictureBox2;
        private Label label5;
        private GroupBox groupBox2;
        private Label label6;
        private GroupBox groupBox3;
        private GroupBox groupBox5;
        private GroupBox groupBox4;
        private GroupBox groupBox6;
        private GroupBox groupBox7;
        private GroupBox gbxResponsiveness;
        private CheckBox cbxResponsiveness0;
        private CheckBox cbxResponsiveness1;
        private CheckBox cbxResponsiveness2;
        private CheckBox cbxResponsiveness3;
        private CheckBox cbxResponsiveness4;
        private CheckBox cbxResponsiveness5;
        private GroupBox gbxReliability;
        private CheckBox cbxReliability0;
        private CheckBox cbxReliability1;
        private CheckBox cbxReliability2;
        private CheckBox cbxReliability3;
        private CheckBox cbxReliability4;
        private CheckBox cbxReliability5;
        private GroupBox gbxFacilities;
        private CheckBox cbxFacilities0;
        private CheckBox cbxFacilities1;
        private CheckBox cbxFacilities2;
        private CheckBox cbxFacilities3;
        private CheckBox cbxFacilities4;
        private CheckBox cbxFacilities5;
        private GroupBox gbxIntegrity;
        private CheckBox cbxIntegrity0;
        private CheckBox cbxIntegrity1;
        private CheckBox cbxIntegrity2;
        private CheckBox cbxIntegrity3;
        private CheckBox cbxIntegrity4;
        private CheckBox cbxIntegrity5;
        private GroupBox gbxCost;
        private GroupBox groupBox8;
        private CheckBox checkBox29;
        private CheckBox checkBox30;
        private CheckBox checkBox31;
        private CheckBox checkBox32;
        private CheckBox checkBox33;
        private CheckBox checkBox34;
        private CheckBox cbxCosts0;
        private CheckBox cbxCosts1;
        private CheckBox cbxCosts2;
        private CheckBox cbxCosts3;
        private CheckBox cbxCosts4;
        private CheckBox cbxCosts5;
        private GroupBox gbxCommunication;
        private CheckBox cbxCommunication0;
        private CheckBox cbxCommunication1;
        private CheckBox cbxCommunication2;
        private CheckBox cbxCommunication3;
        private CheckBox cbxCommunication4;
        private CheckBox cbxCommunication5;
        private Button btnSubmit;
        private Label label11;
        private Label label9;
        private Label label8;
        private Label label7;
        private Label label10;
    }
}