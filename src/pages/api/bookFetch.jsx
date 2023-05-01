import client from "@libs/server/client";

async function fetchAndStoreData() {
  // Replace with the actual API URL you want to fetch data from
  const apiURL = "http://localhost:3000/api/books";

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      console.error("An error occurred while fetching data");
      return [];
    }

    const data = await response.json();

    // Store data in the database (see previous answer for this function)
    try {
      await storeData(data);
    } catch (error) {
      console.error("An error occurred while storing data", error);
      return [];
    }

    // Retrieve the stored data
    try {
      const books = await client.book.findMany({
        include: {
          PurchaseLink: true,
        },
      });

      return books;
    } catch (error) {
      console.error("An error occurred while retrieving data", error);
      return [];
    }
  } catch (error) {
    console.error(
      "An error occurred during the fetchAndStoreData process",
      error
    );
    return [];
  }
}

async function storeData(data) {
  // Loop through the books and store them in the database along with their purchase links
  for (const bookData of data.results.lists[0].books) {
    try {
      // Check if the book already exists in the database
      const existingBook = await client.book.findUnique({
        where: { isbn: BigInt(bookData.primary_isbn13) },
      });

      // If the book does not exist, store it
      if (!existingBook) {
        // Store book data
        const book = await client.book.create({
          data: {
            isbn: BigInt(bookData.primary_isbn13),
            bookTitle: bookData.title,
            imageUrl: bookData.book_image,
            author: bookData.author,
            description: bookData.description,
          },
        });

        // Store purchase links
        for (const linkData of bookData.buy_links) {
          await client.purchaseLink.create({
            data: {
              bookIsbn: BigInt(bookData.primary_isbn13),
              name: linkData.name,
              url: linkData.url,
            },
          });
        }
      }
    } catch (error) {
      console.error(
        `An error occurred while processing the book with ISBN ${bookData.primary_isbn13}`,
        error
      );
    }
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const books = await fetchAndStoreData();

    // Convert BigInt to string before sending the response
    const booksWithIsbnAsString = books.map((book) => ({
      ...book,
      isbn: book.isbn.toString(),
      PurchaseLink: book.PurchaseLink.map((link) => ({
        ...link,
        bookIsbn: link.bookIsbn.toString(),
      })),
    }));

    res.status(200).json(booksWithIsbnAsString);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
