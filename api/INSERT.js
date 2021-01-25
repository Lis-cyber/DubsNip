const { conn } = require("./src/db");

conn.query(`
INSERT INTO "products"  (name, description, price, picture, stock)
VALUES 
('Guitarra', 'Descripcion del producto guitarra', 49.99, 'https://d34zlyc2cp9zm7.cloudfront.net/products/da76de31a98915ca127e54a5a6dc21daa15d2113e861bafa64f20f5cb8cd779f.jpg_500', 5),
('Batería', 'Descripcion del producto batería', 100, 'https://http2.mlstatic.com/D_NQ_NP_913393-MLA43271482345_082020-O.webp', 15),
('Saxofón', 'Descripcion del producto saxofón', 49.99, 'https://http2.mlstatic.com/D_NQ_NP_672068-MLA31978440402_082019-O.webp', 55)
;

INSERT INTO "categories" (name, description)
VALUES 
('cuerdas', 'Esta es la descripción de cuerdas'),
('vientos', 'Esta es la descripción de vientos'),
('pedales', 'Esta es la descripción de pedales')
;

INSERT INTO "Product_Category" ("productId", "CategoryId")
VALUES 
(1, 2),
(2, 2),
(3, 1)
;
`)