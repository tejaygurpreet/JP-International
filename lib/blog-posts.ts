export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Back from paint.. Time to tune!",
    date: "Jun 14, 2015",
    excerpt:
      "After 3 long weeks I finally got the car back from paint. Aerocatch hood pins, NACA duct installed and 3 tone paint job on the hood. Just need to finish the tune and get all my paper work in order and she will be ready to go back on the road!! For everyone that’s going to ask lol yes the duct is fully functional..",
    image: "https://picsum.photos/id/1071/960/640",
  },
  {
    id: "2",
    title: "Projector retrofits and rebuilding fuel sending unit",
    date: "May 02, 2015",
    excerpt:
      "This section will cover the rebuilding of my fuel sending unit and HI bi-xenon mirimoto mini projector retrofits projects. I purchased a fail project set of retrofits from a US forum member last week...",
    image: "https://picsum.photos/id/111/960/640",
  },
  {
    id: "3",
    title:
      "Mazda Of the Month – Best Turbocharged Mazda – Mazdas247 March 2016",
    date: "Mar 31, 2016",
    excerpt:
      "Truly honored to have placed first on the Mazda of the Month (MOTM) competition second year in a row hosted by Mazdas247 for the best turbocharged Mazda.",
    image: "https://picsum.photos/id/133/960/640",
  },
];
