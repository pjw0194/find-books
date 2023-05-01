// pages/book/[isbn].js
import { useRouter } from "next/router";
import client from "@libs/server/client";
import Seo from "@component/components/Seo";

export default function BookDetails({ book }) {
  return (
    <div className="px-10">
      <Seo title={`${book.bookTitle} - Details`} />
      <div className="grid grid-cols-1 place-content-center pt-10">
        <div className="flex flex-col items-center space-y-5 bg-slate-200 p-10 rounded-xl">
          <img
            className="w-1/4 aspect-9/14 rounded-lg drop-shadow-xl"
            src={book.imageUrl}
            alt={book.bookTitle}
          />
          <h1 className="text-2xl font-bold">{book.bookTitle}</h1>
          <h2 className="text-lg font-semibold">Author: {book.author}</h2>
          <p className="text-center w-2/3">{book.description}</p>
          <h3 className="text-lg font-semibold">Purchase Links:</h3>
          <ul className="list-disc pl-5">
            {book.PurchaseLink.map((link, index) => (
              <li className="list-none" key={`link-${index}`}>
                <a
                  href={link.url}
                  className=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { isbn } = context.params;

  const book = await client.book.findUnique({
    where: { isbn: BigInt(isbn) },
    include: {
      PurchaseLink: true,
    },
  });

  const bookWithIsbnAsString = {
    ...book,
    isbn: book.isbn.toString(),
    PurchaseLink: book.PurchaseLink.map((link) => ({
      ...link,
      bookIsbn: link.bookIsbn.toString(),
    })),
  };

  return {
    props: {
      book: bookWithIsbnAsString,
    },
  };
}
