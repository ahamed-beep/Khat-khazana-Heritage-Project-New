import { FaWhatsapp } from 'react-icons/fa';
import Nax from './Nax';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postsubmissiondata } from './Redux/submission';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const SubmissionForm = () => {
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email, setEmail] = useState('');
  const [socialmedia, setSocialmedia] = useState('');
  const [guadianowner, setGuadianowner] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [otherspecify, setOtherspecify] = useState('');
  const [image, setImage] = useState('');
  const [dateimage, setDateimage] = useState('');
  const [placeimage, setPlaceimage] = useState('');
  const [photographcaptain, setPhotographcaptain] = useState('');
  const [story, setStory] = useState('');
  const [narrative, setNarrative] = useState('');
  const [imageadded, setImageadded] = useState(false);
  const [imagebefore, setImagebefore] = useState(false);
  const [termsandcondition, setTermsandcondition] = useState(false);
  const [category, setCategory] = useState('');
  const [title, settitle] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  
  const handleNameChange = (e) => setName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePhone2Change = (e) => setPhone2(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSocialMediaChange = (e) => setSocialmedia(e.target.value);
  const handleGuadianOwnerChange = (e) => setGuadianowner(e.target.checked);
  const handleOtherSpecifyChange = (e) => setOtherspecify(e.target.value);
  const handleDateImageChange = (e) => setDateimage(e.target.value);
  const handlePlaceImageChange = (e) => setPlaceimage(e.target.value);
  const handlePhotographCaptainChange = (e) => setPhotographcaptain(e.target.value);
  const titlehandler = (e) => settitle(e.target.value);
  const handleStoryChange = (e) => setStory(e.target.value);
  const handleNarrativeChange = (e) => setNarrative(e.target.value);
  const handleImageAddedChange = (e) => setImageadded(e.target.checked);
  const handleImageBeforeChange = (e) => setImagebefore(e.target.checked);
  const handleTermsAndConditionChange = (e) => setTermsandcondition(e.target.checked);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    // Set category details based on selection
    const categoryDetails = {
      'love-letters': 'Personal correspondence showing expressions of love and affection',
      'family': 'Family photographs and documents showing family history',
      'war-political-turmoil': 'Documents and photos related to wars or political events',
      'travel': 'Travel-related photographs and documents',
      'dairypages-newspaper': 'Pages from diaries or newspapers',
      'cards-postcards': 'Greeting cards or postcards',
      'moviecards': 'Movie-related cards or memorabilia',
      'calenders': 'Vintage calendars',
      'others': 'Other types of documents not listed',
      'letter-by-famous-personalities': 'Letters written by famous individuals'
    };
    
    setSelectedCategoryDetails(categoryDetails[selectedCategory] || null);
  };

  // Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate terms and conditions
    if (!termsandcondition) {
      toast.error('Please accept the terms and conditions to submit the form');
      return;
    }

    // Validate image is from before 1992
    if (!imagebefore) {
      toast.error('The image must be from before the year 1992');
      return;
    }

    // Prepare the submission data object
    const submissionData = {
      name,
      location,
      phone,
      phone2,
      email,
      socialmedia,
      guadianowner,
      attachment,
      otherspecify,
      image,
      dateimage,
      placeimage,
      photographcaptain,
      story,
      narrative,
      imageadded,
      imagebefore,
      termsandcondition,
      category,
      title,
      language
    };

    // Dispatch the Redux action
    dispatch(postsubmissiondata(submissionData));
    
    // Show success message
    toast.success('Form submitted successfully!');
  };

  return (
    <div>
      <Nax />
      <div className=" mt-18 flex-col lg:flex-row px-4 py-8 max-w-screen-xl flex justify-around mx-auto">
      
        {/* Left Column */}
        <div className="lg:w-2/6 w-full px-4 mb-8 lg:mb-0">
          <div className="flex flex-col items-center mb-4">
            <div className="group w-12 h-12 flex items-center justify-center rounded-full bg-green-600 hover:bg-white border-2 border-green-600 transition duration-300 mr-4">
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} className="text-white group-hover:text-green-600 transition duration-300" />
              </a>
            </div>
            <h2 className="pt-[10px] font-semibold">Whats App this Page</h2>
          </div>

          <hr className="border-t border-dotted border-gray-400 my-4" />

          <h1 className="text-3xl font-semibold bg-[#ffffff] text-black inline-block px-2 mb-2">TERMS OF SUBMISSION</h1>
          <p className="text-yellow-700 font-semibold text-sm pt-[15px]">
            INDIAN MEMORY PROJECT DOES NOT OWN ANY RIGHTS TO ANY IMAGE FOR THIRD PARTY LICENSING. NEITHER DOES IT CHARGE A FEE TO PUBLISH A POST.
          </p>
           
          <div className="p-4">
            <h1 className="text-0xl font-semibold py-5">Submission Requirements</h1>
            <ul className="list-disc pl-4">
              <li>Photograph Scan – 10″ Width, 300 DPI, Jpeg</li>
              <li>Photo Caption Narrative text that can include:
                <ul className="list-disc pl-8">
                  <li>Who are the people in the photograph?</li>
                  <li>Where did the family originate?</li>
                  <li>What did they do?</li>
                  <li>Why was the photograph taken?</li>
                  <li>What other memories does it evoke?</li>
                </ul>
              </li>
            </ul>

            <h1 className="font-semibold mt-4 py-5">CONDITIONS FOR CONTRIBUTIONS</h1>
            <ul className="list-disc pl-4">
              <li>Photographs and documents only from before the year 1992 will be considered.</li>
              <li>Your submission photographs can be from anywhere in the world, as long as the story has a connection to the people and/or places of South Asia / Indian Subcontinent.</li>
              <li>The "Uploader"/"Sender" must be the guardian/owner of the photograph and letters.</li>
              <li>Ensure you know of the people in the photograph. Asking for information from relatives, family and friends can offer new information.</li>
              <li>A short essay, paragraph or story points about the photographs is mandatory. Photographs without the essay or short points will not be considered.</li>
              <li>Photographs could be of your parents, relatives, friends, associates, extended family, grandparents and/or higher in ancestry.</li>
              <li>Names, approximate/exact year the image was taken, location in picture, profession/s, ethnicity, and other personal historical details you'd like to add.</li>
              <li>You agree to your submissions being used in publications, press, exhibitions (national and International), slide presentations, talks, workshops meant for educational and promotion purposes only by Indian Memory Project in all existing and future media.</li>
              <li>If there are queries for your images by third parties, the owner/guardian will be contacted separately for permissions and/or licensing details.</li>
              <li>Indian Memory Project charges a facilitation fee, a non-negotiable Industry Standard 50% facilitation fee + GST of the licensed an image.</li>
              <li>Once posted, the story or the image will not be retracted – temporarily or permanently.</li>
              <li>Pictures, Letters and Documents are administered. All text is fact-checked, proofed and edited to suit the format of the project.</li>
              <li>Indian Memory Project is not responsible for any conflict or disagreement caused within your family or friends by uploading a picture/letter and narrative on its site.</li>
              <li>Indian Memory Project follows up with you for more details that we need to compose a cohesive narrative.</li>
            </ul>
          </div>
        </div>

        {/* Right Column with form */}
        <div className="lg:w-3/5 w-full float-right px-4">
          <hr className="border-black border-dotted border-t w-full my-[20px]" />

          <h2 className="text-lg font-semibold mb-4 text-center">Submission form to contribute a story to the archive.</h2>
          <p className="text-sm leading-[1.9] mb-6">
            Please do read the Terms of Submission on the left. Once the entry is submitted it will be regarded in bounds with all legal permissions sought for inclusion to this archive hereafter. All entries to the archive are researched, fact checked, edited and administered
          </p>

          <hr className="border-t border-dotted border-gray-400 my-9" />

          <p className="text-sm leading-[1.9] pb-9">
            If the form misbehaves, you can instead send us your submission by email with the subject line 'Story Contribution'<br />
            <a href="mailto:hello@indianmemoryproject.com" className="text-black font-semibold">hello@indianmemoryproject.com</a>
          </p>
          
          <div className="bg-[#eeeeee] p-6 max-w-4xl mx-auto text-black">
            <div className="border border-none h-1 py-3 w-1/5"></div>
            <hr className="border-gray-300 dotted pt-4 border-t-2" />

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-[12px] font-sans font-semibold">Full Name of Contributor *</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={handleNameChange}
                  className="w-2/4 p-2 bg-[#ffffff] border my-3 border-transparent h-[40px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-[12px] font-sans font-semibold">Current Location of Contributor *</label>
                <input 
                  type="text" 
                  required 
                  value={location}
                  onChange={handleLocationChange}
                  className="w-2/4 p-2 my-3 bg-[#ffffff] h-[40px] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[12px] font-sans font-semibold">Phone (Include country code) *</label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-2/4 p-2 bg-[#ffffff] my-3 h-[40px] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Alternate Phone */}
              <div>
                <label className="block text-[12px] font-sans font-semibold">Alternate Contact Number</label>
                <input 
                  type="tel" 
                  value={phone2}
                  onChange={handlePhone2Change}
                  className="w-2/4 p-2 bg-[#ffffff] border my-3 h-[40px] border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-sans font-semibold">Email *</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={handleEmailChange}
                  className="w-2/4 p-2 bg-[#ffffff] my-3 h-[40px] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Social Media */}
              <div>
                <label className="block text-[12px] font-sans font-semibold my-3">Social Media Profile Link</label>
                <input 
                  type="url" 
                  value={socialmedia}
                  onChange={handleSocialMediaChange}
                  className="w-2/4 p-2 bg-[#ffffff] my-3 h-[40px] border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
                   <div>
                <label className="block text-[12px] font-sans font-semibold">Full Title of Letter/Photograph *</label>
                <input 
                  type="text" 
                  required 
                  value={title}
                  onChange={titlehandler}
                  className="w-2/4 p-2 bg-[#ffffff] border my-3 border-transparent h-[40px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Permission Checkbox */}
            <div>
              <label className="block text-[12px] font-sans mb-2">Are you the guardian/owner of the image? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="guadianowner"
                    value="true"
                    checked={guadianowner === true}
                    onChange={() => setGuadianowner(true)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="guadianowner"
                    value="false"
                    checked={guadianowner === false}
                    onChange={() => setGuadianowner(false)}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

              {/* Instructions */}
              <div className="mb-6 p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-2 text-[12px] font-sans py-4">Instructions</h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Please read the terms of submission on the left (above on mobile) carefully.</li>
                  <li>Fill in all your name, phone, email and any one social media contact. <strong>*Required Details*</strong></li>
                  <li>Scan a selected image (Photograph / Letter) in 300 DPI (dots per inch) | Image Size – Width 10 inches</li>
                  <li>Save in Jpeg format (Image Quality – 8)</li>
                  <li>Write your story/ narrative about the image in a text/word file first and save it.</li>
                  <li>Copy and paste the text in the Narrative field below.</li>
                  <li>Upload the Jpeg file in the IMAGE UPLOAD field.</li>
                  <li>Verify.</li>
                  <li>Click on Submit.</li>
                </ol>
              </div>

              <div>
                <label className="block font-semibold text-[12px] font-sans">
                  Your visual attachment is a *
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <label>
                    <input
                      type="radio"
                      name="attachment"
                      className="mr-2"
                      checked={attachment === 'Photograph'}
                      onChange={() => setAttachment('Photograph')}
                    />
                    Photograph
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="attachment"
                      className="mr-2"
                      checked={attachment === 'Letter'}
                      onChange={() => setAttachment('Letter')}
                    />
                    Letter
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="attachment"
                      className="mr-2"
                      checked={attachment === 'Other'}
                      onChange={() => setAttachment('Other')}
                    />
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[12px] font-sans">If Other, please specify</label>
                <input 
                  type="text" 
                  value={otherspecify}
                  onChange={handleOtherSpecifyChange}
                  className="w-2/4 p-2 bg-[#ffffff] border my-3 border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-semibold mb-1 py-3 text-[12px] font-sans">PHOTOGRAPHS SPECS</h3>
                <p className="text-sm text-gray-600 mb-2">Hi Res Jpegs only. 10″ width scanned in 300 DPI</p>
                <label className="block font-semibold text-[12px] font-sans">Upload Image (JPEG format only) *</label>
                <input 
                  type="file" 
                  accept="image/jpeg" 
                  required 
                  onChange={handleImageChange}
                  className="w-2/4 border border-gray-400 bg-[#ffffff] file:bg-gray-200 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0"
                />
              </div>

              {/* Date */}
              <div className="relative mb-4 overflow-visible">
                <label className="block font-semibold text-[12px] font-sans mb-1">
                  Which year this letter is from?
                </label>
                <input
                  type="date"
                  value={dateimage}
                  onChange={handleDateImageChange}
                  className="w-full max-w-xs p-2 bg-white border border-gray-300 h-[40px] text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded shadow-sm"
                  min="1900-01-01"
                  max="2000-12-31"
                />
              </div>

              <div className="relative mb-4 overflow-visible">
                <label className="block font-semibold text-[12px] font-sans mb-1">
                  Which category does it lie in? *
                </label>
                <select
                  value={category} 
                  onChange={handleCategoryChange}
                  className="w-full max-w-xs p-2 bg-white border border-gray-300 h-[40px] text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded shadow-sm"
                  required
                >
                  <option value="">Select category</option>
                  <option value="love-letters">LOVE LETTERS</option>
                  <option value="family">FAMILY</option>
                  <option value="war-political-turmoil">WAR/POLITICAL TURMOIL</option>
                  <option value="travel">TRAVEL</option>
                  <option value="dairypages-newspaper">DAIRYPAGES/NEWSPAPER</option>
                  <option value="cards-postcards">CARDS/POSTCARDS</option>
                  <option value="moviecards">MOVIECARDS</option>
                  <option value="calenders">CALENDERS</option>
                  <option value="letter-by-famous-personalities">LETTER BY FAMOUS PERSONALITIES</option>
                  <option value="others">OTHERS</option>
                </select>
                {selectedCategoryDetails && (
                  <p className="text-xs text-gray-600 mt-1">{selectedCategoryDetails}</p>
                )}
              </div>

              {/* Language Selection */}
              <div className="relative mb-4 overflow-visible">
                <label className="block font-semibold text-[12px] font-sans mb-1">
                  Language of the document *
                </label>
                <select
                  value={language} 
                  onChange={handleLanguageChange}
                  className="w-full max-w-xs p-2 bg-white border border-gray-300 h-[40px] text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded shadow-sm"
                  required
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="saraiki">saraiki</option>
                  <option value="urdu">Urdu</option>
                
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[12px] font-sans">Place the image was taken *</label>
                <input 
                  type="text" 
                  value={placeimage}
                  onChange={handlePlaceImageChange}
                  className="w-2/4 p-2 bg-[#ffffff] border border-transparent my-3 h-[40px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[12px] font-sans">Photograph Caption *</label>
                <input 
                  type="text" 
                  value={photographcaptain}
                  onChange={handlePhotographCaptainChange}
                  className="w-2/4 p-2 bg-[#ffffff] border border-transparent my-3 h-[40px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                  required
                />
                <p style={{fontSize:'9px'}}>Name the people in the photograph.</p>
              </div>

              <div>
                <h1 className='font-semibold text-[12px] font-sans'>PASTE A NARRATIVE ABOUT THE IMAGE BELOW</h1>
                <p className='py-4' style={{fontSize:'9px'}}>Short or Long Essay or a Paragraph about this image.</p>
                <label className="block font-semibold text-[12px] font-sans my-3">Narrative (Optional, but we encourage one!)</label>
                <textarea 
                  rows="4" 
                  value={narrative}
                  onChange={handleNarrativeChange}
                  className="w-full p-2 p-2 bg-[#ffffff] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-[12px] font-sans my-3">Story</label>
                <textarea 
                  rows="4" 
                  value={story}
                  onChange={handleStoryChange}
                  className="w-full p-2  bg-[#ffffff] border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block font-semibold text-[12px] font-sans">Have you uploaded an image?</label>
                <div>
                  <label>
                    <input 
                      type="radio" 
                      name="imageadded" 
                      checked={imageadded === true} 
                      onChange={() => setImageadded(true)} 
                      className="mr-2" 
                    /> 
                    Yes
                  </label>
                  <label className="ml-4">
                    <input 
                      type="radio" 
                      name="imageadded" 
                      checked={imageadded === false} 
                      onChange={() => setImageadded(false)} 
                      className="mr-2" 
                    /> 
                    No
                  </label>
                </div>
                
                <label className="block font-semibold text-[12px] font-sans">Is the image from before the Year 1992? *</label>
                <div>
                  <label>
                    <input 
                      type="radio" 
                      name="imagebefore" 
                      checked={imagebefore === true} 
                      onChange={() => setImagebefore(true)} 
                      className="mr-2" 
                    /> 
                    Yes
                  </label>
                  <label className="ml-4">
                    <input 
                      type="radio" 
                      name="imagebefore" 
                      checked={imagebefore === false} 
                      onChange={() => setImagebefore(false)} 
                      className="mr-2" 
                    /> 
                    No
                  </label>
                </div>
                
                <label className="block font-semibold text-[12px] font-sans">Have you read the Terms of Submissions? *</label>
                <div>
                  <label>
                    <input 
                      type="radio" 
                      name="termsandcondition" 
                      checked={termsandcondition === true} 
                      onChange={() => setTermsandcondition(true)} 
                      className="mr-2" 
                    /> 
                    Yes
                  </label>
                  <label className="ml-4">
                    <input 
                      type="radio" 
                      name="termsandcondition" 
                      checked={termsandcondition === false} 
                      onChange={() => setTermsandcondition(false)} 
                      className="mr-2" 
                    /> 
                    No
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!termsandcondition || !imagebefore}
                className={`w-1/2 bg-[#cd9933] hover:bg-yellow-700 text-white font-bold uppercase text-sm py-2 px-4 rounded shadow transition duration-200 ${
                  !termsandcondition || !imagebefore ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Submit
              </button>
              
              {(!termsandcondition || !imagebefore) && (
                <p className="text-red-500 text-sm mt-2">
                  {!termsandcondition && "Please accept the terms and conditions to submit the form. "}
                  {!imagebefore && "The image must be from before the year 1992."}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SubmissionForm;