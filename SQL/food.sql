CREATE TABLE food (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(50) UNIQUE NOT NULL,
    food_type VARCHAR(50) NOT NULL,
    food_description VARCHAR(200) NOT NULL,
    food_price INTEGER NOT NULL,
    food_img VARCHAR(1000) 
);

CREATE TABLE customerorder (
    order_number SERIAL PRIMARY KEY,
    username VARCHAR (30) NOT NULL,
    food_name VARCHAR(50) NOT NULL

);

CREATE TABLE login (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(100),
    email VARCHAR(60),
    street_number VARCHAR(100),
    street_name VARCHAR(100),
    city VARCHAR(100),
    zipcode VARCHAR(100),
    phone_number VARCHAR(100)
    
);





INSERT INTO food(food_name, food_type, food_description, food_price, food_img)
VALUES
    ('Firecracker Shrimp','Appetizers','Shrimp coated in a sweet and spicy glaze',10,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Firecracker-Shrimp_EXPS_FT21_-31652_F_0902_1-10.jpg?fit=700,700'),
    ('Smoked Salmon Bites','Appetizers','Smoked salmon with shallot sauce',8,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Smoked-Salmon-Bites-with-Shallot-Sauce_EXPS_THCA21_158887_B12_18_1b-3.jpg?fit=700,700'),
    ('Shrimp Dip','Appetizers','Creamy blend of shrimp, cheeses, and spices',12,'https://www.tasteofhome.com/wp-content/uploads/2020/08/Hot-Shrimp-Dip_EXPS_TOHDJ21_250409_E07_29_6b-3.jpg?fit=700,700'),
    ('Crawfish Beignets','Appetizers','Savory bites of Louisiana inspired delight',5,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Crawfish-Beignets-with-Cajun-Dipping-Sauce_EXPS_CPTSCCS20_47349_E04_23_2b-1.jpg?fit=700,700'),
    ('Shrimp Cocktail','Appetizers','Shrimp served chilled with a tangy cocktail sauce',10,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Shrimp-Cocktail_EXPS_HCA21_36347_E05_11_6b.jpg?fit=700,700'),
    ('Hot Seafood Spread','Appetizers','Blend of assorted seafood, creamy cheeses, and spices',8,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Hot-Seafood-Spread_EXPS_TBZ22_28902_DR_05_03_10b.jpg?fit=700,700'),
    ('Oysters Rockefeller','Appetizers','Oysters topped with blend of spinach, herbs, and butter',13,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Oysters-Rockefeller_EXPS_TOHFM25_38047_P2_MD_01_04_5b.jpg?fit=700,700'),
    ('Crab Crescent','Appetizers','Crescent roll pockets filled with a savory mixture of tender crab meat',7,'https://www.tasteofhome.com/wp-content/uploads/2018/01/exps80324_THCA153054D02_27_8b-5.jpg?fit=700,700'),
    ('Tzatziki Shrimp Cucumber Rounds','Appetizers','Cucumber rounds topped with tzatziki sauce and shrimp',8,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Tzatziki-Shrimp-Cucumber-Rounds_EXPS_LSBZ18_104123_D01_19_5b-2.jpg?fit=700,700'),
    ('Baked Oysters','Appetizers','Plump oysters topped with a rich and smoky tasso cream sauce',10,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Baked-Oysters-with-Tasso-Cream_exps171509_THRAA2874593D04_02_5b_RMS.jpg?fit=700,700'),
    ('Couscous and Shrimp','Entree','Shrimp served atop toasted couscous, and infused with  spices',18,'https://www.southernliving.com/thmb/hm5E2l5EJzfAu-Pn98OgdegdGU0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2587801_qfssk_couscous_shrimp_215_0_1_0-8da31873642745aa9e0d05c690c73551.jpg'),
    ('Fried Catfish','Entree','Fried catfish fillets coated in a crispy, seasoned breading',15,'https://www.southernliving.com/thmb/-U9FL_ZSVj8HmG9CkbddEGB3Rwk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2545101_nickw_0360_1_2_0_1-233568d4f2c74358ac664aa6598b5efe.jpg'),
    ('Almond Crusted Tilapia','Entree','Baked delicate tilapia fillets coated in a crunchy almond crust',16,'https://www.southernliving.com/thmb/ReIw9IMsZGm3MFXIFPGIuR3Z80U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/almond-tilapia-sl-1611796-x-f3e7f23788bd465e863ac874bdbbe0b9.jpg'),
    ('Shrimp Scampi','Entree','Shrimp cooked with garlic butter, white wine, and fresh basil for a simple yet flavorful dish.',18,'https://www.southernliving.com/thmb/lfd7YoFqes892f4P6HvVF-woGJ4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2600001_qfsju_098_0_0_0-2000-5cb2253f086d469a9d7dbc6bdd0cad01.jpg'),
    ('Teriyaki Salmon','Entree','Grilled salmon glazed in teriyaki sauce,served over rice',20,'https://www.southernliving.com/thmb/5amXiu0GyRoZ_XUOpSMNP-Z8a48=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/teriyaki_salmon_bowls_2548401_slowc_236_0-2000-e469dfe658d3400d8965ffca6b4c4e6e.jpg'),
    ('Shrimp and Peas Pasta','Entree','Tender shrimp and sweet peas tossed with farfalle pasta',20,'https://www.southernliving.com/thmb/XvneXZQsHKMdsS93_7HbYB9Uw6s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shrimp-peas-farfalle-sl-a89824f85e91475d8c241a53269f8ec0.jpg'),
    ('Scallops Herb Rice','Entree','Seared scallops served with lemon herb rice',15,'https://www.southernliving.com/thmb/IKzrEfyaIEMLCwbxlPciCryL7R8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2662601_Suppe_23250-2000-89f1c2088e904082a132e9e87565bcb2.jpg'),
    ('Glazed Salmon','Entree','Salmon fillets glazed with a sweet and savory soy sauce, served alongside roasted vegetables',20,'https://www.southernliving.com/thmb/hw_vhbCG4h0F-B5mpwbizvXIbrA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2548301_QFSHe_646_0_0_0_0_0-2000-cea7272becb34c6d873d7c3befb8e98d.jpg'),
    ('Shrimp Noodle Bowls','Entree','Shrimp served over rice noodles, accompanied by crisp vegetables and fresh herbs',20,'https://www.southernliving.com/thmb/T-O_eJYGjBhIhVNlCeN2YNRNE8Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2662601_Suppe_23279-2000-795b281fa79c410c8cbbc02e2913c332.jpg'),
    ('Shrimp Taco','Entree','Grilled shrimp on warm tortillas, topped with a refreshing grapefruit salad,',14,'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/3/7/2/FNM_040116-Shrimp-Tacos-with-Grapefruit-Salad-Recipe_s4x3.jpg.rend.hgtvcom.791.594.suffix/1457633951014.jpeg'),
    ('Roasted Parmesan Green Beans','Side','Roasted green beans with panko and parmesan cheese',6,'https://thishealthytable.com/wp-content/uploads/2021/11/parmesan-green-beans.jpg'),
    ('Mediterranean Grilled Vegetables','Side','Grilled vegetables topped with herbs, olive oil, and lemon juice',7,'https://thishealthytable.com/wp-content/uploads/2021/08/grilled-mediterranean-vegetables.jpg'),    
    ('Roasted Golden Beets','Side','Roasted beets enhanced with olive oil, salt, and pepper',5,'https://thishealthytable.com/wp-content/uploads/2022/05/roasted-golden-beets.jpg'),
    ('Togarashi Fries','Side','French fries made with a savory, citrus seasoning',5,'https://thishealthytable.com/wp-content/uploads/2022/09/togarashi-fries-6-of-7-edited.jpg'),
    ('Roasted Honeynut Squash','Side','Roasted squash topped with maple butter',9,'https://thishealthytable.com/wp-content/uploads/2021/11/roasted-honeynut-squash.jpg'),
    ('Smashed Brussels Sprouts','Side','Baked crispy brussels sprouts',8,'https://thishealthytable.com/wp-content/uploads/2021/02/smashed-brussels-sprouts-4-of-4.jpg'),
    ('Roasted Purple Potatoes','Side','Garlic and herbs seasoned potatoes',8,'https://thishealthytable.com/wp-content/uploads/2021/11/roasted-purple-potatoes-recipe.jpg'),
    ('Pesto Pasta Salad','Side','Roasted veggies, grilled corn, and homemade pesto',10,'https://thishealthytable.com/wp-content/uploads/2020/07/summer-pesto-salad-7-of-10.jpg'),
    ('Black Bean Salad', 'Side', 'Salad with black beans, bell peppers, and kick of fajita seasoning',7,'https://thishealthytable.com/wp-content/uploads/2021/01/bell-pepper-salad-17-of-19.jpg'),
    ('Grilled Corn','Side','Fresh grilled corn',5,'https://thishealthytable.com/wp-content/uploads/2022/08/grilling-corn-in-husks.jpg'),
    ('Snickers Pie','Dessert','Filled with cream cheese, peanut buuter, whipped cream,and chooped snickers',12,'https://www.allrecipes.com/thmb/0P7gift_h74-ENkeltvsp7azxpI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8550535-no-bake-snickers-pie-ddmfs-hero-4x3-41985-99110260053f4043a799506ea407ccb4.jpg'),
    ('Chocolate Mousse','Dessert','Melted chocolate and whipped cream',10,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2F81826c48eb975944d9ff28277e99eb59%2F1707953742406IMG_4934.jpeg&q=60&c=sc&poi=auto&orient=true&h=512'),
    ('Donut Ice Cream Sandwich','Dessert','Scooped ice cream between donut',8,'https://www.allrecipes.com/thmb/v-ghGlJSsS-F_zEvtcZIwjTURNc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8423867_Donut-Ice-Cream-Sandwiches_TheDailyGourmet_4x3-cfd0931dd590403d9aeef0e170935463.jpg'),
    ('Pound Cake','Dessert','Dense and buttery dessert with a fine crumb texture',11,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7100336.jpg&q=60&c=sc&poi=auto&orient=true&h=512'),
    ('Banana Pudding','Dessert','Creamy vanilla pudding,fresh bananas, and vanilla wafers',15,'https://www.allrecipes.com/thmb/1nmO-W5u-y1_ZWLpEutPZxurKzI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/22749-the-best-banana-pudding-mfs-365-4x3-c932d443ac8243009231dbe6eea8be95.jpg');