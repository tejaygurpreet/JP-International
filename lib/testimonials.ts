export type Testimonial = {
  id: string;
  author: string;
  date: string;
  /** Facebook-style recommendation line */
  recommendLine?: string;
  rating?: number;
  text: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Panda Blanco Bear Torres",
    date: "June 10 at 1:07 PM",
    recommendLine: "Yes, I recommend JP Parts Intl",
    text: "got some OEM msp head lights in good condition, owner is super nice and helpful, shipping was fast, definitely my first place to check next time for OEM parts!! thanks man!!",
  },
  {
    id: "2",
    author: "Jason Park",
    date: "May 3",
    recommendLine: "Yes, I recommend JP Parts Intl",
    text: "Stopped by his shop the other day in need of help and needed my check engine light to be reviewed and cleared. He was a great guy, kind , and willing to help and figured out the problem quickly. I highly recommend him!",
  },
  {
    id: "3",
    author: "Tommy Lam",
    date: "November 1, 2018",
    rating: 5,
    text: "Fantastic one-man show! Bought a pair of 1st Gen. Mazdaspeed 3 Seats and a pair of used Sedan Headlights to Retrofit. Went out of his way to the scrapyard and grabbed great looking headlights. When we met at his Shop - Helped swap out the Seats and off I went with more than I asked for! (Speed 3 Antenna, Pedals, etc.) Honest, kind and straight forward 10/10 will definitely be coming back again.",
  },
  {
    id: "4",
    author: "Troy Kariniemi",
    date: "March 8, 2018",
    rating: 4,
    text: "Needed a radiator, asked for expedited shipping, because I needed the part ASAP. Confirmed shipping and all that, it was good. Then a couple days later, he contacted me saying there was a mistake/miscommunication with the shipping company, and that the package would end up arriving late by several days. He communicated this to me, and said he'd throw in an AC condenser free of charge(I'd asked him if he had one, but decided not to get it due to $$). Package came late as warned, but he compensated fairly for the mishap. Overall good experience. Definitely an inconvenience for paying extra for shipping, but got a part worth more than what I paid for shipping.",
  },
  {
    id: "5",
    author: "Louis Young",
    date: "May 10",
    recommendLine: "Yes, I recommend JP Parts Intl",
    text: "Smooth purchase — OEM parts exactly as described, quick to reply, and shipped out fast. Will check here first for hard-to-find Mazda parts.",
  },
];
