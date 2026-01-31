import React, { useRef, useState } from 'react';
import { five, four, logo, one, three, two } from '../assets';
import RatingHeader from './RatingHeader';
import VirtualKeyboard from './VirtualKeyboard';

const ClientSatisfactionForm = () => {
  // State to handle form data - MUST match backend schema exactly
  const [formData, setFormData] = useState({
    office: '',
    client_type: '',
    gender: '',
    age: '',
    place: '',
    religion: '',
    service_type: '',
    employee_name: '',
    service_date: new Date().toISOString().split('T')[0],

    cc1: '',
    cc2: '',
    cc3: '',

    responsiveness: '',
    reliability: '',
    facilities: '',
    communication: '',
    costs: '',
    integrity: '',
    assurance: '',
    outcome: '',

    comment: '',
    email: '',
    phone_number: ''
  });
  
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const formRef = useRef(null);
  const activeInputRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleFocus = (e) => {
    setActiveInput(e.target.name);
    setShowKeyboard(true);
    activeInputRef.current = e.target;
    
    // Scroll the input into view with some offset for the keyboard
    setTimeout(() => {
      if (activeInputRef.current) {
        const keyboardHeight = 320; // Approximate keyboard height
        const inputRect = activeInputRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if input will be hidden by keyboard
        if (inputRect.bottom > viewportHeight - keyboardHeight) {
          activeInputRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }, 100);
  };
  
  const handleKeyboardChange = (input) => {
    if (!activeInput) return;

    setFormData((prev) => ({
      ...prev,
      [activeInput]: input
    }));
  };

  const handleKeyPress = (button) => {
    if (button === "{enter}") {
      setShowKeyboard(false);
      setActiveInput(null);
    }
  };
  
  const handleCloseKeyboard = () => {
    setShowKeyboard(false);
    setActiveInput(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Parse value to integer for specific fields
    if (['cc1', 'cc2', 'cc3', 'age'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value ? parseInt(value) : '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (criteria, value) => {
    // Convert numeric strings to integers, keep 'NA' as string
    const parsedValue = value === 'NA' ? value : parseInt(value);
    setFormData(prev => ({
      ...prev,
      [criteria]: parsedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Show loading state
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      // Prepare data - ensure all numeric fields are properly formatted
      const submitData = {
        ...formData,
        // Ensure numeric fields are numbers or empty strings
        age: formData.age ? parseInt(formData.age) : '',
        cc1: formData.cc1 ? parseInt(formData.cc1) : '',
        cc2: formData.cc2 ? parseInt(formData.cc2) : '',
        cc3: formData.cc3 ? parseInt(formData.cc3) : '',
        responsiveness: formData.responsiveness === 'NA' ? 'NA' : (formData.responsiveness ? parseInt(formData.responsiveness) : ''),
        reliability: formData.reliability === 'NA' ? 'NA' : (formData.reliability ? parseInt(formData.reliability) : ''),
        facilities: formData.facilities === 'NA' ? 'NA' : (formData.facilities ? parseInt(formData.facilities) : ''),
        communication: formData.communication === 'NA' ? 'NA' : (formData.communication ? parseInt(formData.communication) : ''),
        costs: formData.costs === 'NA' ? 'NA' : (formData.costs ? parseInt(formData.costs) : ''),
        integrity: formData.integrity === 'NA' ? 'NA' : (formData.integrity ? parseInt(formData.integrity) : ''),
        assurance: formData.assurance === 'NA' ? 'NA' : (formData.assurance ? parseInt(formData.assurance) : ''),
        outcome: formData.outcome === 'NA' ? 'NA' : (formData.outcome ? parseInt(formData.outcome) : ''),
      };

      console.log('Submitting data:', submitData);

      // Send data to backend
      const response = await fetch('http://127.0.0.1:5000/api/get-survey-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('Response status:', response.status);

      // Handle successful response
      let result = null;
      try {
        result = await response.json();
        console.log('Server response:', result);
      } catch (jsonError) {
        // If response body is empty or not JSON, that's okay for 201
        console.log('No JSON response body (this is okay for 201 status)');
      }

      if (!response.ok) {
        throw new Error(result?.message || `HTTP error! status: ${response.status}`);
      }
      

      // Show success modal
      setShowSuccessModal(true);

      // Auto close modal after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2500);

      
      // Reset form after successful submission
      setFormData({
        office: '',
        client_type: '',
        gender: '',
        age: '',
        place: '',
        religion: '',
        service_type: '',
        employee_name: '',
        service_date: new Date().toISOString().split('T')[0],
        cc1: '',
        cc2: '',
        cc3: '',
        responsiveness: '',
        reliability: '',
        facilities: '',
        communication: '',
        costs: '',
        integrity: '',
        assurance: '',
        outcome: '',
        comment: '',
        email: '',
        phone_number: ''
      });

      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;

    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error submitting form: ${error.message}`);
      
      // Reset button state on error
      const submitButton = e.target.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = 'Submit';
        submitButton.disabled = false;
      }
    }
  };

  // Emoji mapping for ratings
  const emojiMap = {
    5: five,
    4: four,
    3: three,
    2: two,
    1: one
  };

  return (
    <div 
      ref={formRef}
      className="min-h-screen mb-4 bg-gray-100 py-4 px-4 font-sans text-sm text-gray-800"
      style={{ paddingBottom: showKeyboard ? '350px' : '0' }}
    >
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white border border-gray-300 shadow-lg p-6 ">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-center mb-6 text-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-2 border-blue-900 overflow-hidden">
             <img 
                src={logo}  
                alt="lgu_logo"
                className='w-20 h-20 object-cover'
                />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-wide">LOCAL GOVERNMENT UNIT OF IBA</h1>
            <h2 className="text-2xl font-bold uppercase mt-1">Client Satisfaction Measurement Form</h2>
            <p className="italic text-gray-600 mt-1">Help us serve you better!</p>
          </div>
        </div>

        <p className="mb-6 text-justify leading-relaxed">
          Ang Client Satisfaction Measurement Form na ito ay pagsubaybay sa karanasan mo sa mga gobyerno/ahensya/opisina. 
          Ang iyong tugon sa serbisyong natanggap ay makakatulong para sa aming opiniya na mas mapabuti ang serbisyo nito. 
          Ang iyong mga personal na impormasyon ay mananatiling pribado at ikaw ay may kalayaan na sagutin o hindi ang mga katanungang nakasaad dito.
        </p>

        {/* --- Client Type --- */}
        <div className="border border-gray-300 p-3 mb-4 rounded">
          <label className="font-bold block mb-2">URI NG KLIYENTE:</label>
          <div className="flex flex-wrap gap-6">
            {['General Public', 'Government Employee', 'Business or Private'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="client_type" 
                  value={type} 
                  checked={formData.client_type === type}
                  onChange={handleChange}
                  className="w-4 h-4"
                  required
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* --- Demographics --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 border border-gray-300 p-3 rounded items-center">
          <div className="md:col-span-1 font-bold">TIRAHAN:</div>
          <div className="md:col-span-5">
                <input
                type="text"
                name="place"
                value={formData.place}
                onFocus={handleFocus}
                onChange={handleChange}
                className='border-b border-black w-full'
                required
                />
          </div>
          
          <div className="md:col-span-1 font-bold text-right md:text-center">KASARIAN:</div>
          <div className="md:col-span-3 flex gap-4">
            {[{label: 'Lalaki', value: 'Male'}, {label: 'Babae', value: 'Female'}].map((g) => (
               <label key={g.value} className="flex items-center gap-1 cursor-pointer">
               <input 
                 type="radio" 
                 name="gender" 
                 value={g.value}
                 checked={formData.gender === g.value}
                 onChange={handleChange} 
                 required
               />
               {g.label}
             </label>
            ))}
          </div>

          <div className="md:col-span-1 font-bold text-right">EDAD:</div>
          <div className="md:col-span-1">
            <input 
              type="number" 
              name="age" 
              className="w-full border border-gray-400 px-2 py-0.5"
              value={formData.age}
              onFocus={handleFocus}
              onChange={handleChange} 
              required
            />
          </div>
        </div>

        {/* --- Service Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-3 mb-6 rounded">
          <div className="flex flex-col">
            <label className="font-bold text-xs uppercase mb-1">Opisinang Pinuntahan:</label>
            <select required name="office" value={formData.office} onChange={handleChange} className="border border-gray-400 p-1 w-full">
              <option value="">Select Office...</option>
              <option value="Office of the Sangguniang Bayan">Office of the Sangguniang Bayan</option>
              <option value="Assessor's Office">Assessor's Office</option>
              <option value="Engineering Office">Engineering Office</option>
              <option value="Office for Agricultural Services">Office for Agricultural Services</option>
              <option value="Local Youth Development Office">Local Youth Development Office</option>
              <option value="Municipal Social Welfare and Development Office">Municipal Social Welfare and Development Office</option>
              <option value="Irene Maniquiz Action Center">Irene Maniquiz Action Center</option>
              <option value="Treasury Office">Treasury Office</option>
              <option value="Office of the Civil Registry">Office of the Civil Registry</option>
              <option value="Office on Health Services">Office on Health Services</option>
            </select>
          </div>
          <div className="flex flex-col">
             <label className="font-bold text-xs uppercase mb-1">Petsa:</label>
             <input required type="date" name="service_date" value={formData.service_date} onChange={handleChange} className="border border-gray-400 p-1 w-full"/>
          </div>
          <div className="flex flex-col">
             <label className="font-bold text-xs uppercase mb-1">Uri ng Serbisyo:</label>
             <input required type="text" name="service_type" value={formData.service_type} onChange={handleChange} onFocus={handleFocus} className="border border-gray-400 p-1 w-full"/>
          </div>
          <div className="flex flex-col">
             <label className="font-bold text-xs uppercase mb-1">Pangalan ng Empleyado:</label>
             <input type="text" name="employee_name" value={formData.employee_name} onFocus={handleFocus} onChange={handleChange} className="border border-gray-400 p-1 w-full"/>
          </div>
        </div>

        {/* --- Citizen's Charter --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Citizen's Charter Awareness</h3>
          <p className="mb-4 text-xs italic">
            Markahan ng tsek (✓) ang iyong sagot ukol sa Citizens' Charter na mga katanungan...
          </p>

          <div className="space-y-4">
            {/* CC1 */}
            <div>
              <p className="font-bold mb-1">CC1. Ano ang iyong kamalayan sa Citizen's Charter?</p>
              <div className="space-y-1 ml-4">
                {[
                  "1. Alam ko ang tungkol sa CC at nakikita ko ito sa mga opisina.",
                  "2. Alam ko ang tungkol sa CC pero hindi ko ito nakikita sa mga opisina.",
                  "3. Nalalaman ko lamang ang tungkol sa CC ng makita ko ito sa mga opisina.",
                  "4. Hindi ko alam ang tungkol sa CC at hindi ko ito nakikita sa mga opisina."
                ].map((opt, idx) => (
                  <label key={idx} className="flex items-start gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="cc1" 
                      value={idx + 1}
                      checked={formData.cc1 == (idx + 1)}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
                      }}
                      className="mt-1" 
                      
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* CC2 */}
            <div>
              <p className="font-bold mb-1">CC2. Kung ikaw ay may kamalayan sa Citizen's Charter (sagot sa 1-3 sa CC1), masasabi mo ba na ang CC ng opisinang ito ay...?</p>
              <div className="flex flex-col gap-1 ml-4">
                {[
                  {label: "1. Madaling Makita", value: 1},
                  {label: "2. Medyo Nakikita", value: 2},
                  {label: "3. Mahirap Makita", value: 3},
                  {label: "4. Hindi Nakikita", value: 4},
                  {label: "5. N/A", value: 5}
                ].map((opt) => (
                   <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="checkbox" 
                     name="cc2" 
                     value={opt.value}
                     checked={formData.cc2 == opt.value}
                     onChange={(e) => {
                       const { name, value } = e.target;
                       setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
                     }}
                     
                   />
                   <span>{opt.label}</span>
                 </label>
                ))}
              </div>
            </div>

             {/* CC3 */}
             <div>
              <p className="font-bold mb-1">CC3. Kung ikaw ay may kamalayan sa Citizen's Charter (sagot sa 1-3 sa CC1), paano nakatulong sa iyo ang CC ng opisina sa iyong transaksiyon?</p>
              <div className="space-y-1 ml-4">
                {[
                  {label: "1. Lubos na nakatulong", value: 1},
                  {label: "2. Medyo nakatulong", value: 2},
                  {label: "3. Hindi nakatulong", value: 3},
                  {label: "4. N/A", value: 4}
                ].map((opt) => (
                   <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="checkbox" 
                     name="cc3" 
                     value={opt.value}
                     checked={formData.cc3 == opt.value}
                     onChange={(e) => {
                       const { name, value } = e.target;
                       setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
                     }}
                     className="mt-1" 
                     
                   />
                   <span>{opt.label}</span>
                 </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Satisfaction Table --- */}
        <div className="border border-gray-300 rounded overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-4 w-1/3 text-center align-middle">
                    <span className="font-bold block">SERBISYO</span>
                    <span className="text-xs font-normal mt-2 block">Pindutin ang emoji para piliin ang antas ng iyong kasiyahan.</span>
                  </th>
                  <th className="w-[10%]"><RatingHeader label="LUBOS NA NASIYAHAN" score="5" color="text-orange-500" /></th>
                  <th className="w-[10%]"><RatingHeader label="NASIYAHAN" score="4" color="text-yellow-500" /></th>
                  <th className="w-[10%]"><RatingHeader label="NI NASIYAHAN O HINDI" score="3" color="text-yellow-600" /></th>
                  <th className="w-[10%]"><RatingHeader label="HINDI NASIYAHAN" score="2" color="text-orange-600" /></th>
                  <th className="w-[10%]"><RatingHeader label="LUBOS NA HINDI NASIYAHAN" score="1" color="text-red-600" /></th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                {[
                  { id: 'responsiveness', text: '1. Maagap sa pagtugon sa impormasyon o serbisyong hinihingi. (Responsiveness)' },
                  { id: 'reliability', text: '2. Maasahan ba ang serbisyong naibigay ng opisina? (Reliability)' },
                  { id: 'facilities', text: '3. Ang tanggapan ay may angkop at maayos na pasilidad. (Access and Facilities)' },
                  { id: 'communication', text: '4. Ang empleyadong tumugon ay magalang at may malinaw at madaling maunawaan na pagpapaliwanag. (Communication)' },
                  { id: 'costs', text: '5. Sapat ba at ayon ang halaga na ibinayad katumbas ng serbisyong naibigay? (Costs)' },
                  { id: 'integrity', text: '6. Nagilingkod ba ng buong katapatan at mataas na integridad ang serbisyong naibigay? (Integrity)' },
                  { id: 'assurance', text: '7. May tiwala ba sa kompetensya at propesyonalismo ng mga empleyado? (Assurance)' },
                  { id: 'outcome', text: '8. Nakamit ba ang inaasahang resulta ng serbisyo? (Outcome)' },
                ].map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-t border-gray-200">{row.text}</td>
                    {[5, 4, 3, 2, 1].map((val) => (
                      <td key={val} className="text-center border-t border-gray-200 border-l p-2">
                        <button
                          required
                          type="button"
                          onClick={() => handleRatingChange(row.id, val)}
                          className={`w-12 h-12 md:w-14 md:h-14 transition-all duration-300 transform hover:scale-110 ${
                            formData[row.id] == val 
                              ? 'opacity-100 scale-110' 
                              : formData[row.id] && formData[row.id] !== 'NA'
                              ? 'opacity-20'
                              : 'opacity-70 hover:opacity-80'
                          }`}
                        >
                          <img 
                            src={emojiMap[val]} 
                            alt={`Rating ${val}`}
                            className="w-full h-full object-contain"
                          />
                        </button>
                      </td>
                    ))}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <label className="font-bold text-xs uppercase mb-1 block">REKLAMO O MUNGKAHI PARA MAPABUTI ANG AMING SERBISYO</label>
          <textarea 
            name="comment" 
            rows="3" 
            value={formData.comment}
            onChange={handleChange}
            onFocus={handleFocus}
            className="w-full border border-gray-400 p-2 rounded"
            required
          ></textarea>
        </div>

        {/* --- Contact Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
           <div className="flex flex-col">
             <label className="font-bold text-xs uppercase mb-1">EMAIL ADDRESS (OPTIONAL)</label>
             <input 
               type="email" 
               name="email" 
               value={formData.email}
               onFocus={handleFocus}
               onChange={handleChange}
               className="w-full border border-gray-400 p-2 rounded"
             />
           </div>

           <div className="flex flex-col">
             <label className="font-bold text-xs uppercase mb-1">TELEPHONE NO. (OPTIONAL)</label>
             <input 
               type="text" 
               name="phone_number"
               value={formData.phone_number}
               onFocus={handleFocus} 
               onChange={handleChange}
               className="w-full border border-gray-400 p-2 rounded"
             />
           </div>
        </div>


        {/* --- Submit --- */}
        <div className="flex justify-center py-5">
          <button
            type="submit"
            className="
              inline-flex items-center justify-center
              rounded-lg
              bg-blue-600
              px-24 py-5
              text-lg font-semibold uppercase tracking-wide
              text-white
              shadow-sm
              transition-all
              hover:bg-blue-700 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:scale-[0.98]
              
            "
          >
            Submit
          </button>
        </div>


      </form>

      {showKeyboard && (
        <VirtualKeyboard
          onChange={handleKeyboardChange}
          onKeyPress={handleKeyPress}
          inputValue={activeInput ? String(formData[activeInput] || '') : ""}
          onClose={handleCloseKeyboard}
        />
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-fade-in">
            
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">
              Form Submitted
            </h2>

            {/* Message */}
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Matagumpay na naisumite ang form.  
              Thank you for your response.
            </p>

            {/* Footer note */}
            <div className="mt-5 text-xs text-gray-500">
              This window will close automatically in a few seconds.
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ClientSatisfactionForm;