import Seo from "@component/components/Seo";

export default function Home({ results }) {
  console.log(results);
  return (
    <div className="px-10">
      <Seo title="Home"></Seo>
      <div className="grid grid-cols-1 place-content-center pt-10">
        {results.lists.map((bookList, index) => (
          <div
            className="flex flex-col items-center space-y-10"
            key={`bookList-${index}`}
          >
            <h2 className="text-lg font-bold">{bookList.list_name}</h2>
            <ul className="grid grid-cols-2">
              {bookList.books.map((book, bookIndex) => (
                <div
                  className="flex flex-col items-center h-96 space-y-6"
                  key={`book-${bookIndex}`}
                >
                  <img
                    className="w-1/2 aspect-9/14 rounded-lg drop-shadow-xl"
                    src={book.book_image}
                  />
                  <li className="text-center">{book.title}</li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/books`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
