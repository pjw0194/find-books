import Seo from "@component/components/Seo";
import useUser from "@libs/client/useUser";
import Link from "next/link";

export default function Home({ results }) {
  const user = useUser();
  console.log(user);
  return (
    <div className="px-10">
      <Seo title="Home"></Seo>
      <div className="grid grid-cols-1 place-content-center pt-10">
        <div className="flex flex-col items-center space-y-10">
          <h2 className="text-lg font-bold">Book List</h2>
          <ul className="grid grid-cols-2">
            {results.map((book, bookIndex) => (
              <Link
                key={`book-${bookIndex}`}
                href={`/book/${book.isbn}`}
                legacyBehavior
              >
                <a>
                  <div className="flex flex-col items-center h-96 space-y-6">
                    <img
                      className="w-1/2 aspect-9/14 rounded-lg drop-shadow-xl"
                      src={book.imageUrl}
                      alt={book.bookTitle}
                    />
                    <li className="text-center">{book.bookTitle}</li>
                  </div>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/bookFetch");
  const results = await response.json();

  return {
    props: {
      results,
    },
  };
}
