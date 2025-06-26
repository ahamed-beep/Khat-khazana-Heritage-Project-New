import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Nax from './Nax';
import Footer from './Footer';

// Dummy articles data
const articles = [
{
  id: "1",
  title: "The Forgotten Hathiwalas Of Surat",
  img: "https://c8.alamy.com/comp/J3T2KD/the-kashmiri-people-in-the-early-1900s-were-part-of-the-rich-cultural-J3T2KD.jpg",
  desc: `A few years ago, while I was trying to piece together my extended Surati loram Bohra (Dawoodi Bohras from Surat, Gujarat) family tree, I chanced upon a few photographs that had lain forgotten between photo album sheets for over a century. Photographed circa 1904, this picture could very well be one of the oldest family treasures we have. That little girl in the photograph is my paternal grandmother Kulsum Bengaliwala (née Hathiwala), and the adults are her parents – my great-grandparents.

De familie Bengaliwala, waarmee mijn grootmoeder getrouwd was, migreerde in 1843 van Surat naar Calcutta, tijdens de Britse koloniale tijd, op zoek naar betere economische vooruitzichten. De ouderen in onze familie zeggen dat de reis van Surat naar Bengalen een drie maanden durende, zware tocht was, afgelegd op een ossenkar. Hun eerste commerciële handelsvestiging bevond zich op de hoek van Rabindra Sarani en Colootola Street, in een gebied dat toen bekend stond als 'Zwarte Stad' (Zwarte Stad was waar de lokale Bengalen woonden, en Witte Stad was waar de Britten en andere Europeanen woonden). Van daaruit begonnen ze met de import en export van goederen tussen Surat, Calcutta en verder oostwaarts naar het Oosten. Het lijkt erop dat de familie het redelijk goed heeft gedaan, want ze slaagden erin hun families van Surat naar Calcutta te halen.

Kulsums echtgenoot, mijn grootvader van vaderskant Mohammed Bhoy Patherya, had ook een redelijk succesvol bedrijf, maar na zijn overlijden had het gezin vrijwel geen inkomsten meer. Tijdens mijn onderzoek stuitte ik op oude brieven waarin melding wordt gemaakt van een belastingclaim en waarin wordt beschreven hoe het gezin zijn inkomsten verloor. Hoewel mijn grootmoeder Kulsum geen formele opleiding had genoten, zorgde ze ervoor dat haar dochters toegang hadden tot onderwijs, wat in onze gemeenschap doorgaans niet werd aangemoedigd, en het bleek nuttig toen ze zelf een inkomen moesten gaan verdienen. Mijn tantes waren waarschijnlijk de eerste vrouwen uit onze gemeenschap die gingen werken – en dat was echt een grote stap. Engelstalig onderwijs was na de Tweede Wereldoorlog toegankelijker geworden, en naarmate Anglo-Indiase vrouwen zich bij de beroepsbevolking aansloten, volgden steeds meer vrouwen uit andere gemeenschappen, waaronder de onze.`
}
,
  {
    id: "2",
    title: "I Am A Refugee In Love!",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Old_heritage_in_lahore_-_Lahore_Fort.jpg/1200px-Old_heritage_in_lahore_-_Lahore_Fort.jpg",
    desc: `A few years ago, while I was trying to piece together my extended Surati loram Bohra (Dawoodi Bohras from Surat, Gujarat) family tree, I chanced upon a few photographs that had lain forgotten between photo album sheets for over a century. Photographed circa 1904, this picture could very well be one of the oldest family treasures we have. That little girl in the photograph is my paternal grandmother Kulsum Bengaliwala (née Hathiwala), and the adults are her parents – my great-grandparents.

De familie Bengaliwala, waarmee mijn grootmoeder getrouwd was, migreerde in 1843 van Surat naar Calcutta, tijdens de Britse koloniale tijd, op zoek naar betere economische vooruitzichten. De ouderen in onze familie zeggen dat de reis van Surat naar Bengalen een drie maanden durende, zware tocht was, afgelegd op een ossenkar. Hun eerste commerciële handelsvestiging bevond zich op de hoek van Rabindra Sarani en Colootola Street, in een gebied dat toen bekend stond als 'Zwarte Stad' (Zwarte Stad was waar de lokale Bengalen woonden, en Witte Stad was waar de Britten en andere Europeanen woonden). Van daaruit begonnen ze met de import en export van goederen tussen Surat, Calcutta en verder oostwaarts naar het Oosten. Het lijkt erop dat de familie het redelijk goed heeft gedaan, want ze slaagden erin hun families van Surat naar Calcutta te halen.

Kulsums echtgenoot, mijn grootvader van vaderskant Mohammed Bhoy Patherya, had ook een redelijk succesvol bedrijf, maar na zijn overlijden had het gezin vrijwel geen inkomsten meer. Tijdens mijn onderzoek stuitte ik op oude brieven waarin melding wordt gemaakt van een belastingclaim en waarin wordt beschreven hoe het gezin zijn inkomsten verloor. Hoewel mijn grootmoeder Kulsum geen formele opleiding had genoten, zorgde ze ervoor dat haar dochters toegang hadden tot onderwijs, wat in onze gemeenschap doorgaans niet werd aangemoedigd, en het bleek nuttig toen ze zelf een inkomen moesten gaan verdienen. Mijn tantes waren waarschijnlijk de eerste vrouwen uit onze gemeenschap die gingen werken – en dat was echt een grote stap. Engelstalig onderwijs was na de Tweede Wereldoorlog toegankelijker geworden, en naarmate Anglo-Indiase vrouwen zich bij de beroepsbevolking aansloten, volgden steeds meer vrouwen uit andere gemeenschappen, waaronder de onze.`
},
];

// Sidebar Content Component
const SidebarContent = () => (
  <>
    <div className="mb-6">
      <label className="block uppercase text-sm font-semibold text-gray-700 border-l-2 border-yellow-500 pl-2 mb-2">
        Language
      </label>
      <select className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none mb-2">
        <option>English</option>
      </select>
      <p className="text-xs text-gray-500 italic">
        All translations are machine generated, hence are not 100% accurate.
      </p>
    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Search"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
      />
    </div>

    <div className="mb-6">
      <p className="uppercase text-sm font-semibold text-gray-600 border-l-2 border-yellow-500 pl-2">
        / The Past is Present
      </p>
      <hr className="mt-1 border-t-2 border-black w-2/3" />
    </div>

    <div className="bg-yellow-100 p-4 text-sm text-gray-800 rounded mb-6">
      <p>
        Founded in 2010, Indian Memory Project is an online archive that traces
        the history of the Indian Subcontinent via images and stories contributed
        by people around the world.
      </p>
      <p className="mt-2">
        While no images or text can be used without permissions, everyone is free
        to read and share narrative links. We hope you enjoy this archive as much
        as we do.
      </p>
    </div>

    <div className="mb-6">
      <p className="uppercase text-sm font-semibold text-gray-600 border-l-2 border-yellow-500 pl-2">
        Support the Project
      </p>
      <hr className="mt-1 border-t-2 border-black w-2/3" />

      <div className="my-4 hover:bg-gray-800 transition duration-300">
        <img
          src="https://thumbs.dreamstime.com/b/exploration-slavic-symbol-amidst-ancient-patterns-mystical-designs-generative-ai-captivating-stylization-captures-384001996.jpg"
          alt="Support"
          className="w-full object-contain"
        />
      </div>

      <p className="text-sm text-gray-800">
        For 14 years, Indian Memory Project has remained ad-free and relies on
        personal funds, and your patronage to collect and share stories of the
        subcontinent far and wide.{" "}
        <Link
          to="/productlist"
          className="font-semibold text-yellow-900 hover:text-yellow-600 underline"
        >
          Please Consider Purchasing Our Merchandise
        </Link>
      </p>
    </div>

    <div>
      <hr className="my-3 border-t-2 border-black w-2/3" />
      <p className="uppercase text-sm font-semibold text-gray-600 border-l-2 border-yellow-500 pl-2">
        Directory of Archives
      </p>

      <div className="my-4">
        <img
          src="https://thumbs.dreamstime.com/b/symbolic-representation-slavic-heritage-artistic-design-craftsmanship-generative-ai-ornate-stylization-symbol-384002094.jpg"
          alt="Directory"
          className="w-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <p className="text-sm text-gray-800">
        An updateable list of public and private archives, and museums around the
        world with collections about the Indian Subcontinent.
      </p>
    </div>
  </>
);

// Guidelines Component
const ArticleGuidelines = () => (
  <div className="w-full max-w-xs px-6 text-sm">
    <div className="mb-10">
      <h2 className="border-l-2 border-yellow-600 pl-3 uppercase text-gray-800 font-semibold tracking-wide mb-4">
        Guidelines
      </h2>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li>Image rights belong to the guardian/s of the photograph.</li>
        <li>Text rights belong to Indian Memory Project / The Memory Company</li>
        <li>No images or text can be used without prior permission</li>
        <li>Any unauthorized use will lead to legal action</li>
        <li>
          For Permissions please{" "}
          <span className="underline cursor-pointer text-blue-600">email here</span>
        </li>
      </ul>
    </div>

    <div className="mb-10">
      <h2 className="border-l-2 border-yellow-600 pl-3 uppercase text-gray-800 font-semibold tracking-wide mb-2">
        Subjects
      </h2>
      <select className="w-full border border-gray-300 rounded px-2 py-1 text-gray-700 text-sm">
        <option>Select Category</option>
      </select>
    </div>

    <div className="mb-10">
      <h2 className="border-l-2 border-yellow-600 pl-3 uppercase text-gray-800 font-semibold tracking-wide mb-4">
        Popular Tags
      </h2>
      <div className="text-yellow-800 flex flex-wrap gap-2">
        {[
          '1920', '1930', '1940', '1947', 'India', 'Pakistan', 'Partition', 
          '1950s', '1960s', '1970s', 'Bangalore', 'Bombay', 'British Empire',
          'Calcutta', 'Couple', 'Delhi', 'Doctor', 'Education', 'Fashion & Trends',
          'Gujarat', 'Hair Styles', 'Head Gear', 'Hyderabad', 'Indian Politics',
          'Jewellery', 'Kolkata', 'Lahore', 'Maharashtra', 'Marriage', 
          "Men's Clothes", 'Migration', 'Mumbai', 'Muslim'
        ].map(tag => (
          <span
            key={tag}
            className={`text-sm px-2 py-1 rounded ${
              ['1940', 'Bombay', 'Education', 'Hair Styles', 'Migration', 'Pakistan'].includes(tag)
                ? 'font-bold text-yellow-900 bg-yellow-100'
                : 'font-medium'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-10">
      <hr className="border-black mb-5" />
      <h2 className="border-l-2 border-yellow-600 pl-3 uppercase text-gray-800 font-semibold tracking-wide mb-3">
        Interactive Timeline
      </h2>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwDna5CVJMDpa0ldQubXRosmUZi8k6Kw-dA&s"
        alt="Interactive Timeline"
        className="w-full h-auto mb-6 rounded"
      />
      <hr className="border-black" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Photograph_of_an_Indian_miniature_painting_depicting_Aram_Shah_of_the_Mamluk_Sultanate%2C_published_in_%27Tawarikh-i-Ghuri%27_by_Munshi_Bulaqi_Das_Sahib_%281881%29.jpg"
        alt="Send In Your Family Story"
        className="w-full h-auto mt-6 rounded"
      />
    </div>
  </div>
);

// Main Article Component
const Article = () => {
  const { id } = useParams();
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nax />
        <div className="text-center py-20 text-lg text-red-600">
          Article not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nax />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <SidebarContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-6 hover:text-yellow-600 transition-colors">
                  {article.title}
                </h1>

                <div className="mb-8 overflow-hidden rounded-lg">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">{article.desc}</p>
                </div>
              </div>
            </div>

            {/* Sidebar & Guidelines (Mobile) */}
            <div className="lg:hidden mt-8 bg-white p-6 rounded-lg shadow-sm">
              <SidebarContent />
            </div>

            <div className="mt-8 lg:hidden">
              <ArticleGuidelines />
            </div>
          </div>

          {/* Guidelines (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <ArticleGuidelines />
            </div>
          </div>
        </div>
      </div>
  {/* Promote Products Section */}
<div className="px-4 md:px-0 max-w-6xl mx-auto mb-12">
  <div className="bg-[#FFFBEA] border-l-4 border-yellow-500 text-yellow-900 p-6 md:p-8 rounded-lg shadow-md">
    <div className="flex flex-col md:flex-row items-center gap-6">
      {/* Text */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-[#374151]">Discover More!</h3>
        <p className="text-sm md:text-base mb-4 text-[#374151]">
          Explore our exclusive collection of products that tell stories from the past.
        </p>
        <Link to="/productlist">
          <button className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-300 transition-colors">
            Go to Products <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Image */}
      <img
        src="https://i0.wp.com/lettersofnote.com/wp-content/uploads/2023/03/hem1.jpeg?resize=768%2C1086&ssl=1"
        alt="Featured Product"
        className="w-full md:w-48 h-48 object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
      />
    </div>
  </div>
</div>

      <Footer />
    </div>
  );
};

export default Article;
