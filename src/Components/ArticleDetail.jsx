import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router';
import Nax from './Nax';
import Footer from './Footer';

const articles = [
  {
    id: "1",
    title: "The Forgotten Hathiwalas Of Surat",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Photograph_of_an_Indian_miniature_painting_depicting_Aram_Shah_of_the_Mamluk_Sultanate%2C_published_in_%27Tawarikh-i-Ghuri%27_by_Munshi_Bulaqi_Das_Sahib_%281881%29.jpg",
    desc: `
The story of the Hathiwalas of Surat is not just a family legacy but also a window into a forgotten era of India's mercantile history. In the early 1900s, amid colonial trade, many Dawoodi Bohras migrated between cities, building networks of commerce and kinship. Among them was the Bengaliwala family, which moved from Surat to Calcutta around 1843, seeking prosperity.

This journey was not easy. The elders recount a three-month-long trek on ox-carts, through forests and rivers, to finally settle in a bustling trade district in colonial Calcutta. They quickly established a thriving import-export business on Rabindra Sarani, trading between Gujarat and the East.

One of the family’s rarest heirlooms is a photograph from 1904, featuring young Kulsum Hathiwala — who would later become Kulsum Bengaliwala — standing beside her parents. It’s one of the oldest family photos preserved, capturing a pivotal generation that shaped their descendants’ futures.

Kulsum’s husband, Mohammed Bhoy Patherya, ran a successful enterprise until his untimely death, after which the family's finances dwindled. Letters from that era talk about lost incomes and legal disputes. But Kulsum, despite lacking formal education, made sure her daughters were educated — a radical step for women in their community at the time.

Her efforts bore fruit. Her daughters became among the first working women in the community, entering professional life when societal norms were heavily stacked against them. Their story is one of resilience, transformation, and an unwavering belief in the power of education and change.
    `
  },
  {
    id: "2",
    title: "I Am A Refugee In Love!",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Old_heritage_in_lahore_-_Lahore_Fort.jpg/1200px-Old_heritage_in_lahore_-_Lahore_Fort.jpg",
    desc: `
Love, like history, doesn’t ask for permission before it arrives. It simply steps in, unexpected, irrepressible — much like how I found myself falling for someone across borders and decades of collective trauma.

I am the grandchild of refugees who crossed over from Lahore to Delhi during the Partition. Our family’s oral traditions, marked with sorrow, fear, and nostalgia, were the bedtime stories I grew up with. My grandmother would often talk about the haveli they left behind — the walls that once echoed with laughter but were traded for survival and anonymity on the other side.

Years later, while researching a thesis on cross-border culture, I came in contact with someone from Lahore. What started as an exchange of documents and stories turned into hours-long conversations and shared dreams. Our bond grew despite time zones, visa restrictions, and political red tape.

We both carried scars — I of migration’s inherited anxiety, and he of its direct consequences. Yet, what connected us wasn’t just heritage or history. It was love rooted in understanding. He once said, “I don’t want to erase the border. I want us to build a bridge over it.”

Now, years later, I remain a refugee — not displaced geographically, but emotionally. Because love like ours doesn’t ask for nationalities. It just asks for courage.

This is my story. A story not just of love, but of reconciliation, memory, and a hope for a world where such stories don’t remain the exception.
    `
  }
];

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
      </div>

      {/* Promote Products Section */}
      <div className="px-4 md:px-0 max-w-6xl mx-auto mb-12">
        <div className="bg-[#FFFBEA] border-l-4 border-yellow-500 text-yellow-900 p-6 md:p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-[#374151]">Discover More!</h3>
              <p className="text-sm md:text-base mb-4 text-[#374151]">
                Explore our exclusive collection of products that tell stories from the past. lore
              </p>
              <Link to="/productlist">
                <button className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-300 transition-colors">
                  Go to Products <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>

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
