import sqlite3
import random
from datetime import datetime

# Conectar a la base de datos (crea la DB si no existe)
conn = sqlite3.connect('prisma/dev.db')
cursor = conn.cursor()

# Crear la tabla
cursor.execute('''
CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER,
    image TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
''')

# Función para generar datos aleatorios
def random_product():
    names = [f"Product {i}" for i in range(1, 101)]
    descriptions = ["High quality product", "Affordable price", "Limited edition", None]
    name = random.choice(names)
    description = random.choice(descriptions)
    price = round(random.uniform(5.0, 100.0), 2)  # Precio entre 5.00 y 100.00
    stock = random.randint(0, 50)  # Stock entre 0 y 50
    image = f"https://example.com/images/{name.replace(' ', '_').lower()}.jpg"
    
    return (name, description, price, stock, image)

# Insertar 100 productos aleatorios
for _ in range(100):
    product_data = random_product()
    cursor.execute('''
    INSERT INTO Product (name, description, price, stock, image)
    VALUES (?, ?, ?, ?, ?)
    ''', product_data)

# Guardar cambios y cerrar la conexión
conn.commit()
conn.close()

print("Se han insertado 100 productos aleatorios en la base de datos.")