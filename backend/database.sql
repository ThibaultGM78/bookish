DROP DATABASE IF EXISTS bookish;
CREATE DATABASE bookish;
USE bookish;

CREATE TABLE bookish_product (
    id_product INT AUTO_INCREMENT,
    product_name VARCHAR(50),
    product_author VARCHAR(50),
    product_price DECIMAL(6, 2),
    product_category VARCHAR(30),
    product_stock INT,
    product_desc TEXT,
    product_img VARCHAR(200),
    PRIMARY KEY(id_product)
);

CREATE TABLE bookish_user (
    id_user INT AUTO_INCREMENT,
    user_name VARCHAR(30),
    user_email VARCHAR(30),
    user_password VARCHAR(30),
    PRIMARY KEY(id_user)
);

CREATE TABLE bookish_contact (
    id_contact INT AUTO_INCREMENT,
    contact_date DATE,
    contact_name VARCHAR(30),
    contact_surname VARCHAR(30),
    contact_email VARCHAR(50),
    contact_gender VARCHAR(10),
    contact_birthday DATE,
    contact_function VARCHAR(10),
    contact_subject VARCHAR(30),
    contact_content TEXT,
    PRIMARY KEY (id_contact)
);

CREATE TABLE bookish_payment (
    id_payment INT AUTO_INCREMENT,
    id_user INT,
    payment_date VARCHAR(50),
    payment_adresse VARCHAR(50),
    payment_city VARCHAR(50),
    payment_code VARCHAR(50),
    payment_total INT,
    payment_cart TEXT,
    PRIMARY KEY (id_payment)
);

INSERT INTO bookish_product (product_name, product_author, product_price, product_category, product_stock, product_desc, product_img)
VALUES
('1984', 'George Orwell', 9.99, 'Science Fiction', 50, 'A dystopian novel set in Airstrip One, a province of the superstate Oceania, in a world of perpetual war, omnipresent government surveillance, and public manipulation.', 'http://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Animal Farm', 'George Orwell', 7.99, 'Fiction', 75, 'A satirical allegory of the Russian Revolution where all animals are equal, but some animals are more equal than others.', 'http://books.google.com/books/content?id=UKvYEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Great Gatsby', 'F. Scott Fitzgerald', 15.99, 'Novel', 30, 'A novel set in the Jazz Age that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.', 'http://books.google.com/books/content?id=iXn5U2IzVH0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Catcher in the Rye', 'J.D. Salinger', -1.0, 'Novel', 100, 'A novel that follows the main character, Holden Caulfield, and his mental breakdown following his expulsion frnjustice and the destruction of innocence, it also offers critical commentary on gender roles in the American South.', 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Shining', 'Stephen King', 12.99, 'Horror', 80, 'A horror novel about a family that heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.', 'http://books.google.com/books/content?id=8VnJLu3AvvQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Stand', 'Stephen King', 25.99, 'Horror', 40, 'A post-apocalyptic horror/fantasy novel where the few survivors of a devastating super-flu pandemic struggle to reestablish civilization while battling an evil force.', 'http://books.google.com/books/content?id=UbfnTcmkaKkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Pride and Prejudice', 'Jane Austen', 8.99, 'Romance', 60, 'A romantic novel that follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.', 'http://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Brave New World', 'Aldous Huxley', 11.99, 'Science Fiction', 45, 'A dystopian novel set in a future society characterized by hedonism, totalitarianism, and technological advancement.', 'http://books.google.com/books/content?id=kKh5Dyqxx-QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Fahrenheit 451', 'Ray Bradbury', 10.99, 'Science Fiction', 60, 'A dystopian novel set in a future society where books are outlawed and "firemen" burn any that are found.', 'http://books.google.com/books/content?id=OYtkbGl2j0sC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Hobbit', 'J.R.R. Tolkien', 14.99, 'Fantasy', 35, 'A fantasy novel and prequel to The Lord of the Rings that follows the adventures of Bilbo Baggins, a hobbit who is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the dragon Smaug.', 'http://books.google.com/books/content?id=TCtXEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Lord of the Rings', 'J.R.R. Tolkien', 24.99, 'Fantasy', 20, 'A high fantasy epic that follows the journey of the Fellowship of the Ring as they attempt to destroy the One Ring and defeat the Dark Lord Sauron.', 'http://books.google.com/books/content?id=GWorEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Chronicles of Narnia', 'C.S. Lewis', 19.99, 'Fantasy', 55, 'A series of seven fantasy novels for children that follows the adventures of various children in the magical world of Narnia.', 'http://books.google.com/books/content?id=ArLbO9YdVMMC&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Picture of Dorian Gray', 'Oscar Wilde', 8.99, 'Novel', 70, 'A philosophical novel that explores the themes of beauty, morality, and the influence of art on life.', 'http://books.google.com/books/content?id=iwNzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Dracula', 'Bram Stoker', 7.99, 'Horror', 85, 'A Gothic horror novel that tells the story of Count Dracula, a vampire who moves from Transylvania to England and begins to prey upon the innocent.', 'http://books.google.com/books/content?id=8U49ADLcL0EC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Frankenstein', 'Mary Shelley', 6.99, 'Horror', 90, 'A Gothic horror novel that tells the story of Victor Frankenstein, a young scientist who creates a grotesque but sapient creature in an unorthodox scientific experiment.', 'http://books.google.com/books/content?id=9xHCAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Time Machine', 'H.G. Wells', 5.99, 'Science Fiction', 100, 'A science fiction novel that follows the adventures of an unnamed Time Traveller who journeys into the distant future and encounters the descendants of humanity.', 'http://books.google.com/books/content?id=Yzt4Mwo8BbkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The War of the Worlds', 'H.G. Wells', 9.99, 'Science Fiction', 65, 'A science fiction novel that describes an invasion of late Victorian England by Martians equipped with advanced weaponry and war machines.', 'http://books.google.com/books/content?id=bQlHAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Adventures of Tom Sawyer', 'Mark Twain', 12.99, 'Novel', 40, 'A novel about a young boy growing up along the Mississippi River in the mid-19th century.', 'http://books.google.com/books/content?id=t5yFTpIJYhcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Adventures of Huckleberry Finn', 'Mark Twain', 13.99, 'Novel', 30, 'A novel that follows the adventures of Huckleberry Finn and the runaway slave Jim as they travel down the Mississippi River on a raft.', 'http://books.google.com/books/content?id=7bU4AAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Grapes of Wrath', 'John Steinbeck', 16.99, 'Novel', 25, 'A novel set during the Great Depression that follows the Joad family as they migrate from Oklahoma to California in search of work.', 'http://books.google.com/books/content?id=ClXiwSYzjtYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Old Man and the Sea', 'Ernest Hemingway', 10.99, 'Novel', 50, 'A novel about an aging Cuban fisherman who struggles to catch a giant marlin in the Gulf Stream off the coast of Cuba.', 'http://books.google.com/books/content?id=K1cIZmFe7KoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Sun Also Rises', 'Ernest Hemingway', 12.99, 'Novel', 35, 'A novel that follows a group of American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights.', 'http://books.google.com/books/content?id=QSFZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('A Farewell to Arms', 'Ernest Hemingway', 14.99, 'Novel', 45, 'A novel set during World War I that follows the story of Lieutenant Frederic Henry, an American ambulance driver serving in the Italian army, and his love affair with an English nurse, Catherine Barkley.', 'http://books.google.com/books/content?id=vy_mEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('For Whom the Bell Tolls', 'Ernest Hemingway', 16.99, 'Novel', 20, 'A novel set during the Spanish Civil War that tells the story of Robert Jordan, a young American in the International Brigades attached to an antifascist guerilla unit.', 'http://books.google.com/books/content?id=TdVQAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Great Gatsby', 'F. Scott Fitzgerald', 15.99, 'Novel', 60, 'A novel set in the Jazz Age that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922.', 'http://books.google.com/books/content?id=iXn5U2IzVH0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Tender is the Night', 'F. Scott Fitzgerald', 17.99, 'Novel', 40, 'A novel that follows the life of a young American psychiatrist and his wife, a wealthy former patient, as they move between the French Riviera, Paris, and Switzerland in the 1920s.', 'http://books.google.com/books/content?id=pdToDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Beautiful and Damned', 'F. Scott Fitzgerald', 13.99, 'Novel', 55, "A novel that follows the story of Anthony Patch, a 1910s socialite and presumptive heir to a tycoon's fortune, his relationship with his wife Gloria, and their reckless lifestyle.", 'http://books.google.com/books/content?id=1mtSMQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Last Tycoon', 'F. Scott Fitzgerald', 11.99, 'Novel', 70, 'An unfinished novel that follows the life of Monroe Stahr, a young Hollywood Professioal and studio executive in the 1930s.', 'http://books.google.com/books/content?id=8_7-T9WnbdsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Sound and the Fury', 'William Faulkner', 14.99, 'Novel', 25, 'A novel that explores the decline of the Compson family, a once-proud Southern aristocratic family, through the perspective of four different narrators.', 'http://books.google.com/books/content?id=iHx_EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('As I Lay Dying', 'William Faulkner', 12.99, 'Novel', 30, "A novel that tells the story of the death of Addie Bundren and her family's quest to honor her wish to be buried in the nearby town of Jefferson.", 'http://books.google.com/books/content?id=jU1_EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Light in August', 'William Faulkner', 16.99, 'Novel', 45, 'A novel that explores the themes of race, sex, and religion in the American South through the stories of several characters.', 'http://books.google.com/books/content?id=7ot_EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Unvanquished', 'William Faulkner', 18.99, 'Novel', 20, 'A novel that tells the story of the Sartoris family during the American Civil War and Reconstruction.', 'http://books.google.com/books/content?id=9nqXYKt4Sa0C&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('Absalom, Absalom!', 'William Faulkner', 19.99, 'Novel', 50, 'A novel that explores the history of the fictional Sutpen family in the American South before, during, and after the Civil War.', 'http://books.google.com/books/content?id=PUh_EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('To Have and Have Not', 'Ernest Hemingway', 13.99, 'Novel', 65, 'A novel that follows the story of Harry Morgan, a fishing boat captain in Key West, Florida, who becomes involved in smuggling and other criminal activities.', 'http://books.google.com/books/content?id=HeFSAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Across the River and Into the Trees', 'Ernest Hemingway', 15.99, 'Novel', 35, 'A novel that follows the story of Colonel Richard Cantwell, a 50-year-old American army officer, and his love affair with an 18-year-old Italian girl, Renata.', 'http://books.google.com/books/content?id=TpaCEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Garden of Eden', 'Ernest Hemingway', 17.99, 'Novel', 50, 'A novel that explores the themes of gender, sexuality, and identity through the story of a young American writer and his wife on their honeymoon in the French Riviera.', 'http://books.google.com/books/content?id=kpSCYmXR5K4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Islands in the Stream', 'Ernest Hemingway', 19.99, 'Novel', 25, 'A novel that follows the story of Thomas Hudson, a painter and former soldier, as he navigates his relationships with his three sons, his ex-wife, and his mistress.', 'http://books.google.com/books/content?id=kdJQAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Snows of Kilimanjaro', 'Ernest Hemingway', 11.99, 'Short Story Collection', 70, 'A collection of short stories that explores themes of love, loss, and the human condition.', 'http://books.google.com/books/content?id=QjgiXnMHHtIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Old Man and the Sea', 'Ernest Hemingway', 10.99, 'Novella', 85, 'A novella that tells the story of Santiago, an aging Cuban fisherman, and his struggle to catch a giant marlin.', 'http://books.google.com/books/content?id=K1cIZmFe7KoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Sun Also Rises', 'Ernest Hemingway', 12.99, 'Novel', 60, 'A novel that follows a group of American and British expatriates as they travel from Paris to Pamplona for the running of the bulls.', 'http://books.google.com/books/content?id=QSFZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('A Moveable Feast', 'Ernest Hemingway', 14.99, 'Memoir', 40, "A memoir of Hemingway's years as a struggling young writer in Paris in the 1920s.", 'http://books.google.com/books/content?id=BmBBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Complete Short Stories of Ernest Hemingway', 'Ernest Hemingway', 24.99, 'Short Story Collection', 20, "A collection of Hemingway's short stories, including some of his most famous works.", 'http://books.google.com/books/content?id=0-BSAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Complete Poems of Emily Dickinson', 'Emily Dickinson', 19.99, 'Poetry', 50, "A collection of Dickinson's poetry, including many of her most famous works.", 'http://books.google.com/books/content?id=HwFMEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Collected Poems of Langston Hughes', 'Langston Hughes', 17.99, 'Poetry', 30, "A collection of Hughes's poetry, including many of his most famous works.", 'http://books.google.com/books/content?id=9zYbHaCOI08C&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Waste Land', 'T.S. Eliot', 12.99, 'Poetry', 65, 'A long poem that explores the disillusionment and despair of post-World War I Europe.', 'http://books.google.com/books/content?id=VAxzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Love Song of J. Alfred Prufrock', 'T.S. Eliot', 10.99, 'Poetry', 80, 'A poem that explores the inner thoughts and anxieties of the title character.', 'http://books.google.com/books/content?id=L9fFDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Collected Poems of Wallace Stevens', 'Wallace Stevens', 22.99, 'Poetry', 45, "A collection of Stevens's poetry, including many of his most famous works.", 'http://books.google.com/books/content?id=WIFd5DIm7tgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Collected Poems of Robert Frost', 'Robert Frost', 18.99, 'Poetry', 25, "A collection of Frost's poetry, including many of his most famous works.", 'http://books.google.com/books/content?id=iK-TDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('The Road Not Taken', 'Robert Frost', 9.99, 'Poetry', 70, 'A poem that explores the theme of choices and their consequences.', 'http://books.google.com/books/content?id=zvDsAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Stopping by Woods on a Snowy Evening', 'Robert Frost', 7.99, 'Poetry', 90, 'A poem that explores the theme of the beauty and tranquility of nature.', 'http://books.google.com/books/content?id=J2MkAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
('The Raven', 'Edgar Allan Poe', 6.99, 'Poetry', 100, 'A narrative poem that tells the story of a man who is mourning the loss of his lover and is visited by a talking raven.', 'http://books.google.com/books/content?id=3jxBBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
('Annabel Lee', 'Edgar Allan Poe', 5.99, 'Poetry', 110, 'A poem that tells the story of a man who falls in love with a woman named Annabel Lee when they are both young, but their love is cut short by her untimely death.', 'http://books.google.com/books/content?id=imnqDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');

INSERT INTO bookish_user (user_name,user_email,user_password) VALUES
('Admin', 'admin@bookish.com', '0000'),
('Azek','azek@gmail.com','sasa');

    