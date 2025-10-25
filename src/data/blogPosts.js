// src/data/blogPosts.js

// Placeholder function - replace/expand with actual image URLs
const getBlogImageUrl = (imageName) => {
  const imageMap = {
      'stuti-amrutam': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/4_480x480.png?v=1615147306',
      'leesha-adah': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/Leesha_Adah_by_Leesha_480x480.png?v=1615147525',
      'deepanjali-heyday': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/heydey_480x480.png?v=1615147624',
      'srabasti-sohini-hutke': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/3_480x480.png?v=1615147692',
      'sheena-blue-sheep': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/2_480x480.png?v=1615147782',
      'monalisha-earthaments': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/5_480x480.png?v=1615147854',
      'durga-puja-lookbook-shoshthi': 'https://www.amrapaliboutique.in/cdn/shop/files/DSC04840_large.jpg?v=1755244558', // Blog 2
      'durga-puja-lookbook-shoptomi': 'https://www.amrapaliboutique.in/cdn/shop/products/1_50ec2301-32b2-4b22-8de5-0eb5c302df5e-01_large.jpg?v=1597527808', // Blog 2
      'durga-puja-lookbook-oshtomi': 'https://www.amrapaliboutique.in/cdn/shop/files/IMG_1548-2_large.jpg?v=1723689942', // Blog 2
      'durga-puja-lookbook-nobomi': 'https://www.amrapaliboutique.in/cdn/shop/products/IMG_0236_large.jpg?v=1653779543', // Blog 2
      'durga-puja-lookbook-doshomi': 'https://www.amrapaliboutique.in/cdn/shop/products/1_86860e97-b214-4e31-9cb0-0280688dd681_large.jpg?v=1618650673', // Blog 2
      'sari-love-image': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/DSC_2524_large.jpg?v=1587219513', // Blog 3 - Placeholder
      'rakhi-gift-matka-jamdani': 'https://www.amrapaliboutique.in/cdn/shop/products/1_fcd78349-4218-400e-8e1a-ef359c4513fd_large.jpg?v=1581768880', // Blog 4
      'rakhi-gift-linen-polka': 'https://www.amrapaliboutique.in/cdn/shop/products/DSC02573_large.jpg?v=1651044569', // Blog 4
      'rakhi-gift-cotton-slub': 'https://www.amrapaliboutique.in/cdn/shop/products/1_2_6b6c12ea-89e4-4f43-83ae-193bfb14b9e7_large.jpg?v=1609319643', // Blog 4
      'rakhi-gift-manipuri': 'https://www.amrapaliboutique.in/cdn/shop/products/1_3_88a70303-edb0-40f2-844a-9aaa053482c8_large.jpg?v=1589819889', // Blog 4
      'rakhi-gift-gift-card': '/images/gift-card.jpg', // Blog 4 - Local image
      'mother-inspiration-childhood': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/6_-_desktop_3d2f31ce-b65a-4d5e-9af6-704544a78b95_large.jpg?v=1587220369', // Blog 5
      'mother-inspiration-exhibition': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/13177129_959424554179116_2239616112321277466_n_large.jpg?v=1587220575', // Blog 5
      'mother-inspiration-opening': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/81512875_2674002656054622_1346586003799801856_o_large.jpg?v=1587220813', // Blog 5
      'handloom-making': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/DSC01308_large.jpg?v=1593011833', // Blog 6
      'handloom-collage': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/combo_large.jpg?v=1593013015', // Blog 6
      'handloom-process': 'https://cdn.shopify.com/s/files/1/0082/5091/6915/files/DSC01243_large.jpg?v=1593013084', // Blog 6
      'accessorize-choker': 'https://www.amrapaliboutique.in/cdn/shop/products/AUK00741_large.jpg?v=1657294729', // Blog 7
      'accessorize-studs': 'https://www.amrapaliboutique.in/cdn/shop/products/IMG_7767_large.jpg?v=1642803540', // Blog 7
      'accessorize-ring': '/images/products/jewel1_1.webp', // Blog 7
      'accessorize-pendant': 'https://www.amrapaliboutique.in/cdn/shop/products/DSC06952_large.jpg?v=1642793977', // Blog 7
      'accessorize-kada': 'https://www.amrapaliboutique.in/cdn/shop/products/IMG_4229_large.jpg?v=1655800618', // Blog 7
      'must-have-white-red': '/images/products/saree2_1.webp', // Blog 8
      'must-have-black': '/images/products/saree6_1.webp', // Blog 8
      'must-have-lightweight': '/images/products/saree12_1.webp', // Blog 8
      'must-have-benarasi': '/images/products/saree18_1.webp', // Blog 8
      'must-have-silk': '/images/products/saree14_1.webp', // Blog 8
      'must-have-tussar': '/images/products/saree11_1.webp', // Blog 8
      'must-have-white': '/images/products/saree4_1.webp', // Blog 8
      'must-have-mood': '/images/products/saree3_1.webp', // Blog 8
      // --- FIX: Added missing image keys for Blog 9 ---
      'guide-college-goers': '/images/products/saree21_1.webp',
      'guide-boss-lady': '/images/products/saree20_1.webp',
      'guide-newly-weds': '/images/products/saree4_1.webp', // Reusing image as per data
      'guide-classics': '/images/products/saree18_1.webp', // Reusing image
      'guide-non-conformists': '/images/products/saree12_1.webp', // Reusing image
      'guide-vintage-souls': '/images/products/saree14_1.webp', // Reusing image
      'guide-globetrotters': '/images/products/saree7_1.webp',
      'guide-beginners': '/images/products/saree16_1.webp',
      'guide-daily-draper': '/images/products/saree15_1.webp',
      // --- END FIX ---
  };
  return imageMap[imageName] || `https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found`; // Fallback
};

export const blogPosts = [
  {
    id: 1, // WOMEN WHO INSPIRE
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/01_700x.jpg?v=1614881332',
    title: 'WOMEN WHO INSPIRE - JOURNEY OF 6 INCREDIBLE BRANDS LED BY WOMEN ENTREPRENEURS',
    excerpt: 'On the occasion of International Women’s Day, we at Amrapali spoke to a few women entrepreneurs across various businesses to find out about thei...',
    date: 'March 08, 2021',
    author: 'Amrapali Boutique',
    structuredContent: [ /* ... Content for blog 1 as added previously ... */
        { type: 'paragraph', text: '‘This is a man’s world but it wouldn’t be anything, nothing without a woman or a girl’, sang James Brown’s caveat. Needless to say, women are fierce and independent, bold and undaunted. Women never failed to capture the spirit of progress ushering a brave new world. From our grandmas to moms to sisters to female teachers to girlfriends, the women in our lives have always fueled our zest to do something while striving for excellence. They know what makes each of their family members happy, they know the perfect blend of spices to cook that oh-so-yummy dish, they make huge projects happen at their workplaces and they always know what is where in the house, always! Every woman breaks the glass ceiling of fears everyday in some way. Their strength and enthusiasm is infectious and influential.' },
        { type: 'paragraph', text: 'Thanks to the advent of social media for which we often come across such inspirational stories of women who run a small business from scratch. We, being a women-led venture ourselves, know how tough times can be during one’s entrepreneurial voyage. At the same time, it’s equally rewarding, undoubtedly.' },
        { type: 'paragraph', text: 'On the occasion of International Women’s Day, we, at Amrapali, spoke to a few women entrepreneurs across various businesses, to find out about their brand journey, how they overcame the unprecedented struggles, and what they wish to advise all small business enthusiasts out there.' },
        { type: 'paragraph', text: 'Click to read about each of their stories:' },
        { type: 'linkList', links: [
            { text: 'Amrutam', url: 'https://www.amrutam.co.in/', external: true },
            { text: 'Adah by Leesha', url: 'https://www.adahbyleesha.com/', external: true },
            { text: 'Heydey', url: 'https://www.heydaycare.com/', external: true },
            { text: 'Hutke', url: 'https://www.hutkestore.com/', external: true },
            { text: 'The Blue Sheep Tirthan', url: 'https://www.instagram.com/thebluesheephostel/', external: true },
            { text: 'Earthaments', url: 'https://www.instagram.com/earthaments/', external: true },
        ]},
        { type: 'image', url: getBlogImageUrl('stuti-amrutam'), alt: 'Stuti, Amrutam' },
        { type: 'heading', level: 4, text: 'Stuti, Amrutam' },
        { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/amrutamofficial/', url: 'https://www.instagram.com/amrutamofficial/', external: true },
        { type: 'paragraphWithLink', text: 'Website: ', linkText: 'https://www.amrutam.co.in/', url: 'https://www.amrutam.co.in/', external: true },
        { type: 'numberedList', items: [
            '**Tell us a little bit about your venture.**\nAmrutam Pharmaceuticals is a herbal product manufacturing company and was established in 2006 by my parents, Mr. Ashok Gupta and Mrs. Chandrakanta Gupta.\nWe reinvented ourselves as an Ayurvedic Lifestyle brand in 2017, bringing it online to build a strong connection with our community. We are a wellness brand that strongly believes and endorses the idea of “Health is Beauty.”',
            '**When did you first know you wanted to be an entrepreneur and what was the point that really made you go for it? Tell us your story.**\nI was 17 years old when I started working for an NGO, Gramiksha... (rest of the story)',
            '**What’s the best and what’s the most challenging part about being an entrepreneur?**\nBest part - there is no limit to how much you can grow... \nChallenging part - sometimes the lines, between your professional life and personal needs, they get too blurry...',
            '**If you were to go back to the beginning, would you do anything differently?**\nNo, I wouldn’t change a thing about any of my past experiences - they have made me who I am, and I fully accept it, and cherish it.',
            '**What has been the biggest milestone in the journey of your brand so far?**\nWe have created a strong relationship with over 1,00,000+ Amrutam family members... To add to that, we now have an Amrutam app and we also launched a telemedicine platform called Amrutam.global...',
            '**As a woman, what do you think your superpowers are that help you excel at your work?**\nAs a woman, I have an inbuilt mechanism that helps me understand people and communicate better... My ability to comprehend and communicate clearly always makes me stand out...',
            '**What would be that one piece of advice to all budding entrepreneurs who are just starting out?**\nDon’t chase perfection. In order to do something great, focus more on the discipline and persistence... It’s not about big things that last momentarily, but little things done consistently, that makes it sustainable.'
        ]},
        { type: 'image', url: getBlogImageUrl('leesha-adah'), alt: 'Leesha, Adah by Leesha' },
        { type: 'heading', level: 4, text: 'Leesha, Adah by Leesha' },
        { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/adahbyleesha/', url: 'https://www.instagram.com/adahbyleesha/', external: true },
        { type: 'paragraphWithLink', text: 'Website: ', linkText: 'https://www.adahbyleesha.com/', url: 'https://www.adahbyleesha.com/', external: true },
        { type: 'numberedList', items: [
            '**Tell us a little bit about your venture.**\nAdah by Leesha is a zero waste handloom brand...',
            '**When did you first know you wanted to be an entrepreneur...?**\nI never wanted to be an entrepreneur as such...',
             '**What’s the best and what’s the most challenging part...?**\nThe best part is that you are not answerable to anyone... One more thing I face personally with my business is loneliness...',
             '**If you were to go back to the beginning...?**\nYes, I will not put my energy into things I did...',
             '**What has been the biggest milestone...?**\nTo be able to survive the business through COVID, for sure! ...',
             '**As a woman, what do you think your superpowers are...?**\nMy biggest supporters at work are my sister and mother... Just the instinct of nurturing things...',
             '**What would be that one piece of advice...?**\nDon’t look at another business or entrepreneur and think that’s what you want to do or be like...'
          ]},
        { type: 'image', url: getBlogImageUrl('deepanjali-heyday'), alt: 'Deepanjali, Heyday' },
        { type: 'heading', level: 4, text: 'Deepanjali, Heyday' },
        { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/heydaycare/', url: 'https://www.instagram.com/heydaycare/', external: true },
        { type: 'paragraphWithLink', text: 'Website: ', linkText: 'https://www.heydaycare.com/', url: 'https://www.heydaycare.com/', external: true },
        { type: 'numberedList', items: [
             '**Tell us a little bit about your venture.**\nHeyday is India\'s first mover in the biodegradable, organic, and natural personal hygiene segment...',
             '**When did you first know you wanted to be an entrepreneur...?**\nIt was during my job as a consultant where it dawned upon me that I had the scope of influencing positive impact...',
             '**What’s the best and what’s the most challenging part...?**\nThe best part of being an entrepreneur is that you can never hate your work... The most challenging part especially in my case was entering the period care Industry...',
             '**If you were to go back to the beginning...?**\nEvery day of your journey as an entrepreneur will bring new challenges and teach you a new thing...',
             '**What has been the biggest milestone...?**\nWe have seen a lot of milestones... Forbes 30 under 30, Asia and India, 2018...',
             '**As a woman, what do you think your superpowers are...?**\nBeing consistent, not giving up, and showing up no matter how tough things got...',
             '**What would be that one piece of advice...?**\nDon’t let anyone hold you back, there is so much to be done...'
         ]},
         { type: 'image', url: getBlogImageUrl('srabasti-sohini-hutke'), alt: 'Srabasti & Sohini, Hutke' },
         { type: 'heading', level: 4, text: 'Srabasti & Sohini, Hutke' },
         { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/hutke.store/', url: 'https://www.instagram.com/hutke.store/', external: true },
         { type: 'paragraphWithLink', text: 'Website: ', linkText: 'https://www.hutkestore.com/', url: 'https://www.hutkestore.com/', external: true },
         { type: 'numberedList', items: [
              '**Tell us a little bit about your venture.**\nWe are Hutke, a home decor and soft furnishing online company...',
              '**When did you first know you wanted to be an entrepreneur...?**\nWell for me (Srabasti), it was when I was a kid... Sohini: I was working in bank back in 2015...',
              '**What’s the best and what’s the most challenging part...?**\nThat you are your own boss. It\'s the best and the worst thing...',
              '**If you were to go back to the beginning...?**\nYes, so many things. That one major thing would be to do thorough market research...',
              '**What has been the biggest milestone...?**\nTo be united as an organisation...',
              '**As a woman, what do you think your superpowers are...?**\nCompassion and patience.',
              '**What would be that one piece of advice...?**\nPeople, who are thinking of getting started with their own business, JUST DO IT...'
         ]},
        { type: 'image', url: getBlogImageUrl('sheena-blue-sheep'), alt: 'Sheena, The Blue Sheep Tirthan' },
        { type: 'heading', level: 4, text: 'Sheena, The Blue Sheep Tirthan' },
        { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/thebluesheephostel/', url: 'https://www.instagram.com/thebluesheephostel/', external: true },
        { type: 'numberedList', items: [
             '**Tell us a little bit about your venture.**\nI run a boutique hostel in Tirthan valley in Himachal called The Blue Sheep Tirthan...',
             '**When did you first know you wanted to be an entrepreneur...?**\nI worked for a really interesting environmental organization...',
             '**What’s the best and what’s the most challenging part...?**\nThe most challenging part would be the fact that you become your work...',
             '**If you were to go back to the beginning...?**\nNow that I think of it, surprisingly nothing! ...',
             '**What has been the biggest milestone...?**\nThere isn\'t anything in particular but every time someone writes to us from their heart...',
             '**As a woman, what do you think your superpowers are...?**\nI think women are good at relating to everyone...',
             '**What would be that one piece of advice...?**\nThe first thing I\'d want to tell them is to get ready to work hard...'
        ]},
         { type: 'image', url: getBlogImageUrl('monalisha-earthaments'), alt: 'Monalisha, Earthaments' },
         { type: 'heading', level: 4, text: 'Monalisha, Earthaments' },
         { type: 'paragraphWithLink', text: 'Instagram: ', linkText: 'https://www.instagram.com/earthaments/', url: 'https://www.instagram.com/earthaments/', external: true },
         { type: 'paragraphWithLink', text: 'Facebook: ', linkText: 'https://www.facebook.com/earthments', url: 'https://www.facebook.com/earthments', external: true },
         { type: 'numberedList', items: [
              '**Tell us a little bit about your venture.**\nHere at Earthaments, we relive the stories, tales from yesteryears...',
              '**When did you first know you wanted to be an entrepreneur...?**\nBeing termed an “entrepreneur” wasn’t a distant thought...',
              '**What’s the best and what’s the most challenging part...?**\nIn the transition from an inspired designer to a small-time entrepreneur...',
              '**If you were to go back to the beginning...?**\nI have enjoyed every bit of the journey, thus far...',
              '**What has been the biggest milestone...?**\nI wouldn’t like to identify one as the biggest... people identifying the brand on its name and merit...',
              '**As a woman, what do you think your superpowers are...?**\nSuperpower, I am not sure but being in the business I have crossed paths with a horde of women...',
              '**What would be that one piece of advice...?**\nBe Original! Navigate the world through your own eyes...'
         ]},
        { type: 'paragraph', text: 'Well, we can’t stop admiring the relentless spirits of these incredible women, who had the courage and passion to follow their hearts and to take the road less traveled by. What a pleasure it has been for us to host these supremely talented & passionate entrepreneurs on ‘Stories by Amrapali’ on this special occasion of International Women\'s Day. Their words of wisdom, experiences, struggles, solutions and optimism have taken our zeal to nurture our passion a notch higher.' },
        { type: 'paragraph', text: 'Did you enjoy the stories? We\'d love to know which one inspired you the most. :)' },
    ]
  },
  {
    id: 2, // DURGA PUJA LOOKBOOK
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/durga-pujo-blog_gif_1200x.jpg?v=1602591487',
    title: 'DURGA PUJA LOOKBOOK AMIDST A NEW NORMAL',
    excerpt: 'Ah! It’s October! Another year, another round of festivities. So here we are with our style inspiration guide - sarees we have handpicked with love...',
    date: 'OCTOBER 13, 2020',
    author: 'Amrapali Boutique',
    structuredContent: [
        { type: 'paragraph', text: 'Ah! It’s October! Another year, another round of festivities. With the azure skies of autumn, the soothing sight of kaash phool, the lingering essence of shiuli and grooving beats of dhaak, we can’t contain our excitement anymore. Our most favourite Durga Pujo is right around the corner. While we are all gearing up to unleash the diva inside us, will the face of the celebrations be the same this year? That’s the toughest part to settle with, nevertheless, we could all do with a little bit of playing dress up, to usher in the festive spirit; even if it’s limited to having fun with our friends and fam staying put at home. So here we are with our style inspiration guide – sarees we have handpicked with love that’ll go with the theme of each day of Durga Pujo.' },
        { type: 'heading', level: 4, text: 'Shoshthi' },
        { type: 'paragraph', text: 'Kickstart your Shoshthi morning by inviting your squad in for an exciting lunch dipped with laughter and selfies! Like sunlight itself caught and woven into fabric, look spellbinding in our earthy-toned High-threadcount Pure Cotton Jamdani Saree. Add a zing to your hair with flowers or simply quirk with a messy bun, however you feel the day.' },
        { type: 'imageWithLink', url: getBlogImageUrl('durga-puja-lookbook-shoshthi'), alt: 'Shoshthi Look', productUrl: '/products/high-threadcount-pure-cotton-jamdani' },
        { type: 'linkList', links: [{ text: 'High Threadcount Pure Cotton Jamdani', url: '/products/high-threadcount-pure-cotton-jamdani', external: false }] },
        { type: 'heading', level: 4, text: 'Shoptomi' },
        { type: 'paragraph', text: 'If for you, Durga Pujo is just another way to glam up, embody the joyous spirit that fills the vibe of Shoptomi and opt for a Pure Mercerised In Jacquard Weave saree in a rich maroon hue. It’s not only a treat to eyes but an equally comfy wear to get into the groove of in-house celebrations all day long or a round of dupurer adda with the gang.'},
        { type: 'imageWithLink', url: getBlogImageUrl('durga-puja-lookbook-shoptomi'), alt: 'Shoptomi Look', productUrl: '/collections/durgotsav/products/pure-mercerised-cotton-in-jacquard-weave-with-woven-sequins-4' },
        { type: 'linkList', links: [{ text: 'Pure Mercerised Cotton In Jacquard Weave With Woven Sequins', url: '/collections/durgotsav/products/pure-mercerised-cotton-in-jacquard-weave-with-woven-sequins-4', external: false }] },
        { type: 'heading', level: 4, text: 'Oshtomi' },
        { type: 'paragraph', text: 'This year, we may not hustle in Oshtomi morning to dress up and gather at the mandap for pushpanjali as usual. Offer your prayers to Durga Maa at home and enjoy some scrumptious bhog with your family. And for such intimate plans, an exquisite Red Handloom Pure Chanderi Katan Silk with that perfect sheen and elegance makes for the best pick for Oshtomi.'},
        { type: 'imageWithLink', url: getBlogImageUrl('durga-puja-lookbook-oshtomi'), alt: 'Oshtomi Look', productUrl: '/collections/durgotsav/products/red-handloom-pure-chanderi-katan-silk'},
        { type: 'linkList', links: [{ text: 'Red Handloom Pure Chanderi Katan Silk', url: '/collections/durgotsav/products/red-handloom-pure-chanderi-katan-silk', external: false }] },
        { type: 'heading', level: 4, text: 'Nobomi' },
        { type: 'paragraph', text: 'If you aren’t up for sartorial experimenting, cling onto something traditional for Nobomi. Celebrate not only the festival but also the heritage intricacy of the treasured handloom that Swarnachari from Bengal is. As you carry the timeless appeal of such a delightful six yard from our Roopkatha collection, make the best of the last days of Pujo with a blast.'},
        { type: 'imageWithLink', url: getBlogImageUrl('durga-puja-lookbook-nobomi'), alt: 'Nobomi Look', productUrl: '/collections/roopkatha/products/devdutta'},
        { type: 'linkList', links: [{ text: 'Devdutta', url: '/collections/roopkatha/products/devdutta', external: false }] },
        { type: 'heading', level: 4, text: 'Doshomi' },
        { type: 'paragraph', text: 'We can’t see ourselves relishing in the sight of Maa-er boron at the pandal and merrily enjoy shindoor khela this time. What we can do is drape an iconic ‘Laal Padh Shada Saree’ to have a little get together with neighbors or relatives and indulge in loads of mishtimukh! Make your good times as beautiful as possible by choosing a quintessential red bordered white saree from our beloved Doodhe-Alta collection.'},
        { type: 'imageWithLink', url: getBlogImageUrl('durga-puja-lookbook-doshomi'), alt: 'Doshomi Look', productUrl: '/collections/doodhe-alta/products/handloom-tussar-cotton-katiya'},
        { type: 'linkList', links: [{ text: 'Handloom Tussar Cotton Katiya', url: '/collections/doodhe-alta/products/handloom-tussar-cotton-katiya', external: false }] },
        { type: 'paragraph', text: 'We hope this guide will help you sort out last moment pujo shopping and to pick your favourite piece. If you’re still looking for more options, you could have a look at the four red-hot festive collections on our website -' },
        { type: 'blockquote', content: [
            { type: 'link', text: 'https://www.amrapaliboutique.in/collections/durgotsav', url: 'https://www.amrapaliboutique.in/collections/durgotsav', external: true },
            { type: 'link', text: 'https://www.amrapaliboutique.in/collections/doodhe-alta', url: 'https://www.amrapaliboutique.in/collections/doodhe-alta', external: true },
            { type: 'link', text: 'https://www.amrapaliboutique.in/collections/roopkatha', url: 'https://www.amrapaliboutique.in/collections/roopkatha', external: true },
        ]},
        { type: 'paragraph', text: 'Last but not the least, make sure you maintain all the safety protocols while celebrating with family and friends. Let’s make the best out of what we have and make this pujo a memorable one, in an unique way!' }
    ]
  },
    {
    id: 3, // WHERE MY LOVE FOR SARI...
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/5_-_desktop_0d901e16-8bdd-41e5-857c-8ca59bb94d6e_700x.jpg?v=1587224339',
    title: 'WHERE MY LOVE FOR SARI ORIGINATES FROM?',
    excerpt: 'Perhaps it came from the mother who goes around the day draped in a saree at such ease and poise or maybe the grandmother whose soft cotton lap tol...',
    date: 'APRIL 18, 2020',
    author: 'Amrapali Boutique', // Or 'SHRAMONA PODDAR' if preferred
    // --- CORRECTED: Use structuredContent ---
    structuredContent: [
      { 
        type: 'blockquote', 
        style: 'poem', // This matches the special style in BlogPage.jsx
        content: [
          'Wailing like a loud siren',
          'looking like a blob of cotton',
          'Maa wrapped me in a green floral cloth,',
          'smelling of warmth, love and care.',
          'My first experience of a saree',
          'was as a three month old goofball,',
          'looking confused yet learning',
          'the affection that comes',
          'with a cloth splattered with warmth all over.',
          'Twenty six years later,',
          'I still like to wrap myself around one.',
          '', // Stanza break
          'As a five year old, I got into a fight',
          'with our house help, to let me drape',
          'maa\'s saree before she could fold it.',
          'Two stitches around my forehead later,',
          '(That came from hitting my head',
          'to the corner of the bed),',
          'I realised I was looking out',
          'to be like my Maa who drapes a saree',
          'so effortlessly and goes around the day',
          'at such ease and poise.',
          'Like mother, like daughter-',
          'I wanted to be.',
          '', // Stanza break
          'I grew up watching my grandma and maa',
          'wearing the six yards of unstitched cloth',
          'in record breaking time,',
          'hoping someday I could do that too.',
          'I would spend hours lying down',
          'digging my face',
          'into the softness of their laps,',
          'listening to tales from their childhood and mine.',
          '', // Stanza break
          'My love for sarees came to me',
          'almost naturally, passing on',
          'from a generation to other.',
          'But it is slowly that I learnt',
          'that a saree is not just a piece of cloth',
          'but there are thousands of stories',
          'hidden in the creases and the folds.',
          'And as I drape one around myself',
          'and turn to the mirror',
          'to place the bindi on my forehead,',
          'I can’t help but to smile',
          'looking at myself wondering',
          'how did I make the transition-',
          'In a world of fast fashion-',
          'To stick by the tradition',
          'with a touch of modernity.',
          '', // Stanza break
          'Sarees. They are pieces of nostalgia',
          'Wrapped with the spirit of womanhood,',
          'that makes me feel so powerful',
          'yet gentle, fierce yet elegant.',
          'And within these emotions',
          'lie the connection',
          'between saree and me,',
          'that started long ago,',
          'but is here to stay,',
          'perhaps forever,',
          'perhaps a little more.'
        ]
      },
      // Add the image that appears after the poem
      { type: 'image', url: getBlogImageUrl('sari-love-image'), alt: 'Woman in saree' }
    ]
  },


   {
    id: 4, // 5 WEARABLE PIECES OF ART
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/18_-_desktop_3a7c5917-23ab-46aa-a23c-84e036548abb_700x.jpg?v=1595828862',
    title: '5 Wearable Pieces of Art to Gift your Sister this Rakhi',
    excerpt: `With Raksha Bandhan just around the corner, why not make your sister's day a little brighter and show her how much she means to you by gifting her ...`,
    date: 'JULY 27, 2020',
    author: 'Amrapali Boutique',
    structuredContent: [
        { type: 'paragraph', text: 'Growing up, having a sister may not have always seemed easy; but now we bet, you simply can’t imagine your life without her, can you? From being each other’s secret keepers to speaking in languages and laughter which no one understands, siblings are one of life’s greatest blessings. And with Raksha Bandhan just around the corner, why not make her day a little brighter and show her how much she means to you by gifting her a wearable piece of art? Choose one from our curated listicle based on her taste & personality and you won’t go wrong, we promise!' },
        { type: 'heading', level: 5, text: '> Loves to dress up for occasions' },
        { type: 'paragraph', text: 'Let’s just get this straight. Ladies love to get ready for special events in a grand way. They want their outfits on point and won’t compromise to stand second in the queue of best-dressed party attendees. If your sister always freaks out on what to wear before any occasion, our lightweight Handwoven Pure Matka Jamdani With Gold Butas is surely going to steal her heart with its classy look & rich texture!' },
        { type: 'imageWithLink', url: getBlogImageUrl('rakhi-gift-matka-jamdani'), alt: 'Handwoven Pure Matka Jamdani With Gold Butas', productUrl: '/products/handwoven-pure-matka-jamdani-with-gold-butas' },
        { type: 'linkList', links: [{ text: 'Handwoven Pure Matka Jamdani with Gold Butas', url: '/products/handwoven-pure-matka-jamdani-with-gold-butas', external: false }] },
        { type: 'heading', level: 5, text: '> A fun-loving soul who swears by colors' },
        { type: 'paragraph', text: 'If she’s someone who loves to experiment with a pop of colors & you’ve noticed vibrant shades in her style statement, you can undoubtedly go with our Handwoven Linen Polka Jamdani Saree. If her presence feels like a confetti of rainbows & unicorns, she’s definitely going to fall in love with this gorgeous piece.' },
        { type: 'imageWithLink', url: getBlogImageUrl('rakhi-gift-linen-polka'), alt: 'Handwoven Linen Polka Jamdani Saree', productUrl: '/collections/linen/products/handwoven-linen-cotton-jamdani'},
        { type: 'linkList', links: [{ text: 'Handwoven Linen Polka Jamdani', url: '/collections/linen/products/handwoven-linen-cotton-jamdani', external: false }] },
        { type: 'heading', level: 5, text: '> A beginner in the game of sarees' },
        { type: 'paragraph', text: 'Has she recently talked about her newfound love for sarees? Or, have you seen her struggling to get a saree as she is skeptical about whether she’ll be able to carry it off? You can gift your sister a bundle of joy by getting her one of our signature Cotton Slub sarees called ‘Feeling Blue’. It’s easy to drape, lightweight, and perfect for newbies in the world of six yards of elegance. Her gleaming face with a wide smile after draping this will melt your heart for sure!' },
        { type: 'imageWithLink', url: getBlogImageUrl('rakhi-gift-cotton-slub'), alt: 'Feeling Blue Cotton Slub Saree', productUrl: '/collections/linen/products/handwoven-jamdani' },
        { type: 'linkList', links: [{ text: 'Feeling Blue', url: '/collections/linen/products/handwoven-jamdani', external: false }] },
        { type: 'heading', level: 5, text: '> Head over heels with everything fusion' },
        { type: 'paragraph', text: 'Her fashion therapy is aligned with the philosophy of combining the best of both worlds, traditional & contemporary, and you’re pretty sure about that, look no further! Our Handwoven Pure Mercerized Cotton With Manipuri Pattern Threadwork saree is the one she needs to have in her closet. An extremely comfortable fabric & soothing hue makes for the ultimate fodder to play with different draping styles as well.' },
        { type: 'imageWithLink', url: getBlogImageUrl('rakhi-gift-manipuri'), alt: 'Handwoven Pure Mercerized Cotton With Manipuri Pattern Threadwork', productUrl: '/collections/linen/products/handwoven-pure-mercerised-cotton-jamdani'},
        { type: 'linkList', links: [{ text: 'Handwoven Pure Mercerised Cotton with Manipuri Pattern Threadwork', url: '/collections/linen/products/handwoven-pure-mercerised-cotton-jamdani', external: false }] },
        { type: 'heading', level: 5, text: '> Still confused? GIFT CARD to the rescue' },
        { type: 'paragraph', text: 'Finally, if you couldn’t picturize your sister in the scene while reading the above possibilities, worry not. We’ve still got your back! We understand you’re unsure of her fashion choices and hence- why not get her our GIFT CARD? She can purchase anything of her choice from our website & bless you with loads of love for this oh-so-clever idea!' },
        { type: 'imageWithLink', url: getBlogImageUrl('rakhi-gift-gift-card'), alt: 'E-Gift Card', productUrl: '/products/e-gift-card' },
        { type: 'linkList', links: [{ text: 'GIFT CARD', url: '/products/e-gift-card', external: false }] },
        { type: 'paragraph', text: 'This is it. We hope you take your sister by surprise with any of these thoughtful choices. Sarees are evergreen and do make for one of the best gifts. A gift that she’d want to show off for years to come and every time she drapes the beauty, she’ll get a sweet reminder of just how much you adore her. :)' }
    ]
  },
  {
    id: 5, // THE INSPIRATION BEHIND AMRAPALI
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/6_desktop_700x.jpg?v=1587224669',
    title: 'The Inspiration Behind Amrapali – story of our mother',
    excerpt: `‘You are never too old or too young to dream’, my mother taught this to me at a very young age when I didn’t quite have enough grey hair on my head...`,
    date: 'JUNE 25, 2020',
    author: 'SHRAMONA PODDAR',
    structuredContent: [
        { type: 'image', url: getBlogImageUrl('mother-inspiration-childhood'), alt: 'Mother reading to child' },
        { type: 'paragraph', text: '‘You are never too old or too young to dream’, my mother taught this to me at a very young age when I didn’t quite have enough grey hair on my head to comprehend the meaning of that phrase. But in the course of my growing up years, I learnt what it truly means through her outlook towards life.' },
        { type: 'paragraph', text: 'From the stories I have heard about her adolescent years and as a young adult, I gathered that she has always been a very curious and eager person. When I cribbed to her about my first disastrous ‘roti’ making experience, she assured me that I will get better. She said that she learnt it as a child by asking her mother to keep some extra dough for her in the end, enough for one ‘roti’ and that is how she mastered the art of roti-making, little by little. She learnt sewing, stitching, knitting, putting buttons on her brothers’ shirts, all the same way. She would gather the leftover wool strands from her mother, tie them together and make a single long strand of wool and use two sticks to learn knitting.' },
        { type: 'paragraph', text: 'As she stepped into her conjugal life, things got a little more challenging. She had a huge family to take care of, along with household work. However despite all the work that came her way, she didn’t stop.' },
        { type: 'image', url: getBlogImageUrl('mother-inspiration-exhibition'), alt: 'Mother with artwork' },
        { type: 'paragraph', text: 'Along with being a wonderful cook, she began to learn bandhni and batik, embroidery, block printing and painting on sarees. She started hosting exhibitions with her teammates to display and sell the artworks. The house would often smell of raw wax from the dye of batik and I remember not being fond of that smell. Oh, I was quite a troublesome kid. Coming back from school, had I not got the sight of my mother, I used to throw a lot of tantrums. What I perhaps thought was love and attachment, is quite embarrassing, and can admittedly be called annoying now. So well, with housework, two kids and an entire family to take care of, she gradually stopped pursuing those dreams. But she continued living them through colorful sweaters that she would knit for us and helping with our SUPW homework from school. I recall, at the age of thirteen, right before the Christmas party in school, bandanas were in trend. I didn’t know where to buy them from so she knitted three of those for me. The entire school was in awe. But well, apart from the joyous thank you’s and zealous hugs, not much appreciation came her way, and maybe she wasn’t looking for much too. Perhaps she just wanted an outlet to be able to pursue her hobbies amidst the monotony of life.' },
        { type: 'image', url: getBlogImageUrl('mother-inspiration-opening'), alt: 'Store opening ceremony' },
        { type: 'paragraph', text: 'Gradually, my sister and I grew up and we moved to different cities to pursue higher education. Suddenly she had a lot of time on her hands. From being the lady of the house running from six till midnight, she was beginning to find some time for herself again. So she decided to press on the rewind button and bring back her dreams that had been lying unattended for a long time. And that is when Amrapali was born. She turned our drawing room into a makeshift store and that’s how she started Amrapali. She started sourcing different sarees from weavers of small villages, self-painted and embroidered on some of them and started selling her curated pieces. My sister and I whole-heartedly supported her in this new quest but since we were far away from home, she singlehandedly managed it all. It was only her determination and dedication that led to the onset of Amrapali. Admittedly, there were not a lot of customers to begin with; not to mention the multiple challenges that came along. Back then, people were not exposed much to the idea of purchasing from small, home-grown businesses. That apart, not many people knew about it in the first place and on most days there were no customers at all. The location of our house being in a quiet cul-de-sac, didn\'t aid much in the process too. But she kept pursuing, keeping a positive outlook and slowly by slowly started dreaming for bigger things.' },
        { type: 'paragraph', text: 'It was eventually at the age of fifty; she took a space on the main road of our small town Chandannagar in West Bengal and opened a four walled boutique. ‘Amrapali Boutique’ written in red block letters, she finally saw her vision coming to life.' },
        { type: 'paragraph', text: 'Naturally, she gave it her all. Right from sourcing, marketing, accounting– she was doing it all by herself with the help of four employees, who have now become family. Gradually it started receiving appreciation from across and became the talk of the town. Little joys, little victories and little bits of acknowledgement used to make her immensely happy. She worked all day, managing home and business meticulously, shifting between her identities of that of a mother, wife, an entrepreneur and the woman of the house at ease. Slowly my sister and I joined in. Her energy was too infectious to not catch onto and perhaps that is what made us fall in love with sarees and the art of selling them. We took Amrapali online, first on Instagram and then with all the love and appreciation we received worldwide, together we dared to dream bigger as we opened our website on 15th August 2019. Since then it has been an overwhelming journey. Today, Amrapali Boutique is an online store and a humble, home-grown store tucked away in the heart of West-Bengal, where we celebrate handloom in all its glory while creating and curating finest hand-crafted collections that capture the spirit and essence of India.' },
        { type: 'paragraph', text: 'At present, my sister and I manage the online website while she continues to manage the store. We all live in different parts of the country but one thing that brings us together is our collective love for Amrapali and sarees.' },
        { type: 'paragraph', text: 'Our mother, in her free time, goes through all the comments and messages on social media and just like us, her heart beams with joy each time one of you compliment us and our collection, handcrafted with love. And well, even at this age - after accomplishing so much- her curiosity and eagerness haven’t come to a stop. She now wants to enroll herself into a jewelry course, she told me over a call last day.' },
        { type: 'paragraph', text: 'Well, they don’t make a lot like her in the universe. There are very few of them. And I’m glad I have one such gem in my life and that too as my mother.' },
        { type: 'paragraph', text: 'So, this is her. The boss woman, the mother, the lady who will always be the sole inspiration behind Amrapali.' }
    ]
  },
  {
    id: 6, // THE ‘IMPERFECT’ BEAUTY OF HANDLOOM
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/DSC01233_700x.jpg?v=1593011452',
    title: 'The ‘imperfect’ beauty of Handloom',
    excerpt: `Flawless. Perfect. Unblemished. Untainted. These are words that will perhaps never be used to describe a ‘handloom’ saree. Handloom - a fabric wove...`,
    date: 'JUNE 25, 2020',
    author: 'Amrapali Boutique',
    structuredContent: [
        { type: 'paragraph', text: 'Flawless. Perfect. Unblemished. Untainted.' },
        { type: 'paragraph', text: 'These are words that will perhaps never be used to describe a ‘handloom’ saree. Handloom - a fabric woven on a loom that is manually operated by the weaver ‘with his own bare hands’. Well, in that case, isn’t it bound to have flaws?' },
        { type: 'paragraph', text: 'The flaws, imperfections, or so called ‘defects’- maybe an uneven yarn, a tiny hole, a cut, a tear, a knot, an unfinished motif, a faded print, a small stain; are seemingly too many. Handloom is not perfect. It can never be.' },
        { type: 'paragraph', text: 'But is there still beauty in it? Yes. In abundance.' },
        { type: 'image', url: getBlogImageUrl('handloom-making'), alt: 'Making of handloom saree' },
        { type: 'paragraph', text: 'The imperfectness of handloom is what makes it beautiful. You see those tiny holes are actually the pin marks, resulting from the saree being pinned to the loom. That small stain could very well be of the oil used to lubricate the loom, a drop of which, might have accidently gotten spilt over in an ill-timed moment and that extra black knot on that pristine white saree, could be a strand of lint or black thread that fell on the loom fabric due to the gushing winds that day, and perhaps gotten woven in the process too.' },
        { type: 'paragraph', text: 'The point is, each of these imperfections has a story to tell. Each handloom piece is unique in itself. And most importantly, each of these fabrics is lovingly created by human hands with utmost patience, warmth, love and hope woven in threads. Isn’t that fascinating?' },
        { type: 'image', url: getBlogImageUrl('handloom-collage'), alt: 'Handloom collage' },
        { type: 'paragraph', text: 'Handloom is an art. It is an art that involves persistence besides tremendous skill and effort. There is such spectacular craftsmanship involved in fabrics woven all across India. Nonetheless, the sad truth is, despite handloom being a part of India’s legacy since time immemorial, many weavers still struggle to make their ends meet. In fact, more often than not, the entire family of the weaver sweats it out, engaging themselves in the weaving process, so as to increase the production and in turn, earn some more moolah; and a handloom saree rightly demands a higher price.' },
        { type: 'paragraph', text: 'However, as the masses are drawn to the attraction of lower rate power-loom (machine-woven) sarees; left with no choice, many weavers involuntarily adopt the power-loom, fearing being out of work. Not that there is anything wrong with a machine woven product, but how about sustaining what we have been practicing since ages and not eliminating it completely from the ecosystem? Each time we buy a handloom saree, we are actually doing our bit and contributing to the survival of that family, empowering them,as well as keeping the ancient craft and heritage of India upright. Isn’t that beautiful?' },
        { type: 'image', url: getBlogImageUrl('handloom-process'), alt: 'Process of handloom' },
        { type: 'paragraph', text: 'Let us collectively work towards a day when we wholeheartedly embrace the imperfections of handloom and find beauty in its flaws. A day when we are able to listen to even the untold stories of handloom. A day when we don’t just drape a saree, but feel the soul of it.' },
        { type: 'paragraphWithLink', text: 'Browse through our collection of handloom sarees ', linkText: 'here.', url: '/collections/all-sarees', external: false },
    ]
  },
  {
    id: 7, // 5 TIPS ON HOW TO ACCESSORIZE
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/3_-_desktop_700x.jpg?v=1587301462',
    title: '5 Tips On How To Accessorize Your Desi Look',
    excerpt:`When you are donning a saree, jewelry – out of all accessories -  can transform an entire look when styled right. So what we have here for you are ...`,
    date: 'JUNE 25, 2020',
    author: 'Amrapali Boutique',
    structuredContent: [
        { type: 'paragraph', text: 'Accessories can make or break an outfit – a phrase we have often heard in the world of fashion. When you are donning a saree, \'jewelry\' – out of all accessories - can transform an entire look when styled right. No matter the occasion, your junk drawer full of shiny things is what\'s going to add that extra zing to your look!' },
        { type: 'paragraph', text: 'What we have here are five detailed tricks to ace the brilliance of jewelry while draping a saree with immense aplomb!' },
        { type: 'heading', level: 4, text: '#1 With plain and simple saree' },
        { type: 'paragraph', text: 'If you are wearing a simple saree or a monochromatic one, you can risk going all out on the jewelry front. You can dress up by simply teaming it with a chunky neckpiece and big jhumkas. So, even if your saree is plain, your jewelry will amplify the look entirely. That way, you can carry off the minimal ensemble with maximum pizzazz!' },
        { type: 'imageWithLink', url: getBlogImageUrl('accessorize-choker'), alt: 'Antique Finish German Silver Ghungroo Choker Necklace', productUrl: '/products/antique-finish-german-silver-ghungroo-choker-necklace'},
        { type: 'linkList', links: [{ text: 'Antique Finish German Silver Ghungroo Choker Necklace', url: '/products/antique-finish-german-silver-ghungroo-choker-necklace', external: false }] },
        { type: 'heading', level: 4, text: '#2 With heavy & loud saree' },
        { type: 'paragraph', text: 'Wearing a heavy & bright-colored saree? This kind of look can be better placed & explained with minimal & elegant jewelry. You want your saree to be the main show. So add jewelry that will help to enhance the look rather than choosing the ones which will stand out on its own. Fashion folks will definitely want to approve of such a combination as a delightful fashion coup!' },
        { type: 'imageWithLink', url: getBlogImageUrl('accessorize-studs'), alt: 'Dual-toned Floral Embossed Statement Studs', productUrl: '/products/pearly-delight-studs'},
        { type: 'linkList', links: [{ text: 'Dual-toned Floral Embossed Statement Studs', url: '/products/pearly-delight-studs', external: false }] },
        { type: 'heading', level: 4, text: '#3 Magic of Statement Jewelry' },
        { type: 'paragraph', text: 'Even a basic look can be transformed into vogue attire if paired with one statement piece of jewelry. Be it a big chunky necklace or a heavy ring, your look will definitely establish a statement to make everyone around you go awestruck! Keep the makeup minimal and let the jewelry stand out. Trust us the result is truly a masterpiece.' },
        { type: 'imageWithLink', url: getBlogImageUrl('accessorize-ring'), alt: 'German Silver Floral Adjustable Surya Ring', productUrl: '/products/german-silver-floral-adjustable-surya-ring'},
        { type: 'linkList', links: [{ text: 'German Silver Floral Adjustable Surya Ring', url: '/products/german-silver-floral-adjustable-surya-ring', external: false }] },
        { type: 'heading', level: 4, text: '#4 Follow the shade of the saree' },
        { type: 'paragraph', text: 'Another magic to furnish your styling is to go with the jewelry of the same color as that of the threads or border of the saree. If it is woven with silver thread, you may opt for silver jewelry rather than golden ones. Follow this while sporting different six yards of silhouettes because they all really come together in the most beauteous way!' },
        { type: 'imageWithLink', url: getBlogImageUrl('accessorize-pendant'), alt: 'Pure Silver Tribal Art Embossed Pendant Necklace', productUrl: '/products/vintage-medallion'},
        { type: 'linkList', links: [{ text: 'Pure Silver Tribal Art Embossed Pendant Necklace', url: '/products/vintage-medallion', external: false }] },
        { type: 'heading', level: 4, text: '#5 Make the drape the master' },
        { type: 'paragraph', text: 'Today, YouTube & IGTV are flooded with oodles of videos exhibiting different styles to drape a saree. And they have become our go-to stylebook for gaining much-needed drive to break the shackle of draping a saree in the old-school traditional way. It’s time to spice up your take on draping a saree with some uber-cool quirky jewelry. If you are a fanatic of the casual way to drape a saree, a long-threaded necklace is the game-changer for you. Also, if it\'s a classic fabric like Benarasi for any occasion, a Kada or a long ball necklace adorned with jhumkas or pashas are the most sartorially genius choice of accessories to enlighten the traditional originality.' },
        { type: 'imageWithLink', url: getBlogImageUrl('accessorize-kada'), alt: 'German Silver Solid Chunky Statement Kada', productUrl: '/products/german-silver-solid-chunky-statement-kada'},
        { type: 'linkList', links: [{ text: 'German Silver Solid Chunky Statement Kada', url: '/products/german-silver-solid-chunky-statement-kada', external: false }] },
        { type: 'paragraph', text: 'Keeping up with all the knick-knacks in the world of jewelry is a tough cookie to follow. We just put together the evergreen jewelry choices that are harmonious to almost all the moods and occasions. Thank us later!' },
        { type: 'paragraphWithLink', text: 'You can browse through our jewellery collection ', linkText: 'here', url: '/collections/all-jewellery', external: false }
    ]
  },
   {
    id: 8, // 8 MUST-HAVE SAREES
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/DSC_6256_1eca4af5-e62a-4f1a-899d-51efd130e69c_700x.jpg?v=1587224219',
    title: '8 Must-Have Sarees For A Timeless Wardrobe',
    excerpt:`Be it a wedding, a soirée, a corporate affair, a brunch, or perhaps an inner urge to drape a saree on a casual workday, or that feeling of teaming ...`,
    date: 'APRIL 18, 2020',
    author: 'Amrapali Boutique',
    structuredContent: [
        { type: 'paragraph', text: 'Smashing the existing fashion stereotypes, \'sarees\' rule across all seasons undoubtedly! Be it a wedding, a soirée, a corporate affair, a brunch, or perhaps an inner urge to drape a saree on a casual workday, or that feeling of teaming up an Indian tone with a wee bit of western; we have you covered. Our guide to have these eight must have sarees will serve all you want and perhaps more.' },
        { type: 'heading', level: 5, text: '> A Quintessential White And Red Saree' },
        { type: 'paragraph', text: 'Acing the elegance and charm since forever is the classic red-bordered sarees which is very dear to Bengali women as ‘Laal Padh Shada Saree’. However you don\'t have to be a Bengali to own one! This heritage ensemble fits the bill as a traditional festive wear as well as a day wear wedding saree, if you are aiming for a classic fuss-free look. As a bonafide fashion devotee, you must get yourself one too.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-white-red'), alt: 'Handloom Pure Cotton Kalakshetra', productUrl: '/collections/handspun-pure-khadi-cotton-kalakshetra' },
        { type: 'linkList', links: [{ text: 'Handloom Pure Cotton Kalakshetra', url: '/collections/handspun-pure-khadi-cotton-kalakshetra', external: false }] },
        { type: 'heading', level: 5, text: '> A Classic Black Saree' },
        { type: 'paragraph', text: 'In an ocean of gaudy glitz, there is something glamorous about \'black\' as a color. It\'s seductive aesthetics ignite a new idea of grace that every woman accepts. Black is far more superior to all other hues that define classiness and a saree in black is a must-have in your closet for its versatile utility. As they say, "you can never go wrong in black."' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-black'), alt: 'Linen Jamdani with Silver and Copper Accents', productUrl: '/collections/linen/products/handwoven-pure-linen-jamdani-with-silver-and-copper-accents-1' },
        { type: 'linkList', links: [{ text: 'Linen Jamdani with Silver and Copper Accents', url: '/collections/linen/products/handwoven-pure-linen-jamdani-with-silver-and-copper-accents-1', external: false }] },
        { type: 'heading', level: 5, text: '> A lightweight/easy-to-drape saree' },
        { type: 'paragraph', text: 'Who says you can\'t wear sarees all day? Embody the right spirit of office drudge or college schedule in a stylish yet comfy saree. Not only does it reflect an offbeat way of life, but also makes you feel empowered in an effortless way. Stock up on breezy linen or cotton sarees and make your everyday look oh-so-unique and yet roam around comfortably from am to pm.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-lightweight'), alt: 'Pure Linen Jamdani', productUrl: '/collections/linen/products/handwoven-linen-cotton-jamdani' },
        { type: 'linkList', links: [{ text: 'Pure Linen Jamdani', url: '/collections/linen/products/handwoven-linen-cotton-jamdani', external: false }] },
        { type: 'heading', level: 5, text: '> A Heritage Benarasi' },
        { type: 'paragraph', text: 'The history and intricacies of the treasured Indian Handloom heritage \'Benarasi\', capture the joyous spirit of any celebration. Adorned with spectacular work of craftsmanship, Benarasi sarees are the evergreen sartorial inspiration for Indian women. Choose a gorgeous light-weight Benarasi saree in a rich hue, that’s not only a treat to the eyes but also breaks the monotony of fashion peepers.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-benarasi'), alt: 'Handwoven Pure Muga Benarasi With Antique-Gold Motifs', productUrl: '/products/handwoven-pure-muga-benarasi-with-antique-gold-motifs-2?_pos=1&_sid=4551fda9a&_ss=r' },
        { type: 'linkList', links: [{ text: 'Handwoven Pure Muga Benarasi With Antique-Gold Motifs', url: '/products/handwoven-pure-muga-benarasi-with-antique-gold-motifs-2?_pos=1&_sid=4551fda9a&_ss=r', external: false }] },
        { type: 'heading', level: 5, text: '> A Versatile Silk Saree' },
        { type: 'paragraph', text: 'Silk stands as the most revered fabric with its fan base ranging from the royal aristocracy to modern fashion enthusiasts. Even ancient Indian literary works explain how beautiful a woman looks in a silk saree. You can rock a silk saree in any season or occasion. Thus, every woman’s trousseau trunk must have one piece of Matka, Dupion , Chanderi or any other six yards of \'silk\' opulence!' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-silk'), alt: 'Handwoven Pure Matka Jamdani With Gold Butas', productUrl: '/products/handwoven-pure-matka-jamdani-with-gold-butas' },
        { type: 'linkList', links: [{ text: 'Handwoven Pure Matka Jamdani With Gold Butas', url: '/products/handwoven-pure-matka-jamdani-with-gold-butas', external: false }] },
        { type: 'heading', level: 5, text: '> A Timeless Tussar Saree' },
        { type: 'paragraph', text: 'Different silhouettes and trends might come and go, but a woman will always look feminine and glamorous when decked up in six yards of elegance. The beauty of the six yards of staple gets amplified if its fabric is Tussar, the ultimate food for the soul of saree lovers. The rawness of Tussar represents a distinct timelessness, extreme comfort and sense of assurance in an ever-changing fashion dynamics.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-tussar'), alt: 'Discharge Block Print On Pure Tussar Silk', productUrl: '/collections/silk-and-tussar/products/discharge-block-print-on-pure-tussar-silk-10' },
        { type: 'linkList', links: [{ text: 'Discharge Block Print On Pure Tussar Silk', url: '/collections/silk-and-tussar/products/discharge-block-print-on-pure-tussar-silk-10', external: false }] },
        { type: 'heading', level: 5, text: '> An Iconic All-White Saree' },
        { type: 'paragraph', text: 'White exudes the right amount of charm and no color quite matches the elegance that it oozes. A white saree always adds a glare of modern whimsy that we cannot help but feel awestruck with. It is a universally popular choice for a special or casual occasion, that you can always rely upon.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-white'), alt: 'Handloom Pure Cotton Tissue Jamdani', productUrl: '/collections/new-arrivals/products/handloom-pure-cotton-tissue-jamdani-1' },
        { type: 'linkList', links: [{ text: 'Handloom Pure Cotton Tissue Jamdani', url: '/collections/new-arrivals/products/handloom-pure-cotton-tissue-jamdani-1', external: false }] },
        { type: 'heading', level: 5, text: '> A Mood Uplifter' },
        { type: 'paragraph', text: 'A vibrant-hued outfit dipped in six yards of tradition with a playful undertone is a great addition to a woman\'s wardrobe. Mingle some colorful pieces with the assortment of your favorite sarees, to spunk up the spectrum of variations in it. Be it to sport a boho chic look, a brunch, a movie date or just to a friend’s house party, it\'s the perfect pick for the confident, go-getter women of today.' },
        { type: 'imageWithLink', url: getBlogImageUrl('must-have-mood'), alt: 'Handspun Pure Cotton With Tassels', productUrl: '/collections/handspun-pure-cotton-with-tassels' },
        { type: 'linkList', links: [{ text: 'Handspun Pure Cotton With Tassels', url: '/collections/handspun-pure-cotton-with-tassels', external: false }] },
        { type: 'paragraph', text: 'With this comprehensive handbook in your bookmarks, you’re all set to prove that sarees are enough to justify the augustness of every occasion and it’s the ultimate closet MVP!' }
    ]
  },
  {
    id: 9,
    image: 'https://www.amrapaliboutique.in/cdn/shop/articles/16_-_desktop_1200x.jpg?v=1587224572',
    title: 'The Ultimate Guide to All Things Saree For Different Fashion Folks',
    excerpt: `Saree. The imperishable fashion apparel that we know of, not just in terms of its aureate gloriousness but also in terms of its far-flung versatili...`,
    date: 'JUNE 25, 2020', // Date from video
    author: 'Amrapali Boutique',
    structuredContent: [
      { type: 'paragraph', text: 'Saree. The imperishable fashion apparel that we know of, not just in terms of its aureate gloriousness but also in terms of its far-flung versatility. In this article, we are going to emphasize on the latter aspect. It makes for the best sustainable and down-to-earth sartorial fashion choice for every woman. The clothes we wear, are the immediate illustrations of our idiosyncrasies. And sarees, however, manage to fit into almost everyone’s wardrobe. We’re here to coach you on how you can adopt the various kinds of six-yards of gorgeousness that best suits your profession & style preferences!' },
      { type: 'heading', level: 4, text: '> The College Goers' },
      { type: 'paragraph', text: 'College days are phenomenal. It gifts all of us a treasure trove of memories & moments that we adore forever! To make yourself more charming on those selfies and polaroids, add some six yards of glamour to your college outfit haul. Take a break from your regular Jeans & Tees while donning a saree in your classes, canteen breaks, and impromptu movie outings with your gang!' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-college-goers'), alt: 'Handspun Pure Cotton with Tassels', productUrl: '/collections/handspun-pure-cotton-with-tassels' },
      { type: 'linkList', links: [{ text: 'Handspun Pure Cotton with Tassels', url: '/collections/handspun-pure-cotton-with-tassels', external: false }] },
      { type: 'heading', level: 4, text: '> The Boss lady' },
      { type: 'paragraph', text: 'Looking neat & presentable is the crux of the workwear concept. And it does not always have to be greys & blacks. An extremely comfortable and flowy saree is an equally magnetic outfit option for the goal-digger women out there! Emblaze your intellectual potential with a dash of style in a saree and conquer your professional world.' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-boss-lady'), alt: 'Peanut Butter', productUrl: '#' },
      { type: 'linkList', links: [{ text: 'Peanut Butter', url: '#', external: false }] },
      { type: 'heading', level: 4, text: '> The Newly Weds' },
      { type: 'paragraph', text: 'Worried about what to pack and what to not? Bride-to-be/Newly-married ladies, worry no more! It’s very crucial for you to choose colossally soft and sublime sarees to sail through the grinding yet exciting sessions of getting introduced to relatives and premiere cooking drills. A piece that exhibits the confluence of traditional heritage and airy comfort is perfect for your fashion situation.' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-newly-weds'), alt: 'Handwoven pure mercerised cotton jamdani with manipuri pattern threadwork', productUrl: '/collections/handwoven-pure-mercerised-cotton-jamdani-with-manipuri-pattern-threadwork' },
      { type: 'linkList', links: [{ text: 'Handwoven pure mercerised cotton jamdani with manipuri pattern threadwork', url: '/collections/handwoven-pure-mercerised-cotton-jamdani-with-manipuri-pattern-threadwork', external: false }] },
      { type: 'heading', level: 4, text: '> The Classics' },
      { type: 'paragraph', text: 'Saree is that bespoke attire that continues to hit its magical streak with the heritage luxury and sensuousness. Imbue your own brand of elegance and style by draping the classic six yards that never go out of time. These sarees tell a tale of an intimate affair of class with everything regal. Rich with reverence of Indian textile fabrics, vintage details & native techniques, these are go-to drapes for any occasion!' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-classics'), alt: 'Handwoven pista green pure tussar benarasi', productUrl: '/collections/handwoven-pista-green-pure-tussar-benarasi' },
      { type: 'linkList', links: [{ text: 'Handwoven pista green pure tussar benarasi', url: '/collections/handwoven-pista-green-pure-tussar-benarasi', external: false }] },
      { type: 'heading', level: 4, text: '> The Non-Conformists' },
      { type: 'paragraph', text: 'Sucker for silhouettes abloom with experimental styling that involves boots and belts? We have some wondrous reccos for you! The versatility of sarees, when mingled with shirts and accessories, makes it an exciting option for those who love it in a ‘different’ way. Break the conventional code of wearing a saree and doll up yourself by draping it however you like.' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-non-conformists'), alt: 'Pure linen jamdani', productUrl: '/collections/pure-linen-jamdani' },
      { type: 'linkList', links: [{ text: 'Pure linen jamdani', url: '/collections/pure-linen-jamdani', external: false }] },
      { type: 'heading', level: 4, text: '> The Vintage Souls' },
      { type: 'paragraph', text: 'In these times of torn jeans & neon hues, saree plays a significant role to feed the souls of maniacs crazy about anything vintage. Groove on the whimsical world of antique patterns and undertone shades to set the retro mood right. Covet a quant piece offering a flair of contemporary kitsch by indulging yourself in your favorite books, music, and thoughts.' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-vintage-souls'), alt: 'Handwoven Pure Muga Benarasi With Antique-Gold Motifs', productUrl: '/products/handwoven-pure-muga-benarasi-with-antique-gold-motifs-2?_pos=1&_sid=4551fda9a&_ss=r' },
      { type: 'linkList', links: [{ text: 'Handwoven Pure Muga Benarasi With Antique-Gold Motifs', url: '/products/handwoven-pure-muga-benarasi-with-antique-gold-motifs-2?_pos=1&_sid=4551fda9a&_ss=r', external: false }] },
      { type: 'heading', level: 4, text: '> The Globetrotters' },
      { type: 'paragraph', text: 'Wondering what to wear for your next holiday? Along with the usual joggers & sweatshirts, it’s time to introduce your travel outfit formula to the resplendence of sarees. The airy-breezy weaves will help you look like a dream in your dream destination! Pair ‘em with sneakers or whatever you’re comfortable in while following your wanderlust & popping up your charming elegance wherever you go.' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-globetrotters'), alt: 'White handwoven pure linen jamdani with woven temple border', productUrl: '/collections/white-handwoven-pure-linen-jamdani-with-woven-temp' },
      { type: 'linkList', links: [{ text: 'White handwoven pure linen jamdani with woven temple border', url: '/collections/white-handwoven-pure-linen-jamdani-with-woven-temp', external: false }] },
      { type: 'heading', level: 4, text: '> The Beginners' },
      { type: 'paragraph', text: 'Did you recently develop a love for sarees? Are you worried you might end up looking like a messy bunny? Worry not, we have handpicked a few easy-to-drape yet alluring pieces you need to have in your closet as a newbie. You can carry this attire with utmost perfection and it’s super comfortable. Your brand new look in six yards of grace will surely set a mark to establish fads among your girlfriends!' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-beginners'), alt: 'Pink Colorblock Cotton With Pompoms', productUrl: '/collections/pink-colorblock-cotton-with-pompoms' },
      { type: 'linkList', links: [{ text: 'Pink Colorblock Cotton With Pompoms', url: '/collections/pink-colorblock-cotton-with-pompoms', external: false }] },
      { type: 'heading', level: 4, text: '> The Daily Draper' },
      { type: 'paragraph', text: 'An appropriate lightweight saree can make your everyday look from drab to fab. These pieces are the must-haves for the ones who wear a saree very often and they don’t need any occasion for that. The gossamer fabrics and a whole lot of pastel & paisley are the promising mates to aid you in running for daily errands & chores. Remember, this guide is the textbook example of how simplicity can earn you big numbers!' },
      { type: 'imageWithLink', url: getBlogImageUrl('guide-daily-draper'), alt: 'Handwoven Pure Linen Jamdani With Zari Border', productUrl: '/collections/linen/products/handwoven-pure-linen-jamdani-with-zari-border' },
      { type: 'linkList', links: [{ text: 'Handwoven Pure Linen Jamdani With Zari Border', url: '/collections/linen/products/handwoven-pure-linen-jamdani-with-zari-border', external: false }] },
      { type: 'paragraph', text: 'Rise high above the trends & veer your style towards the classics. Such is the charm of sarees and you can effortlessly rely on its magnificence on every mood and hap you encounter with!' }
    ]
  }
  // ... other blog posts
];

