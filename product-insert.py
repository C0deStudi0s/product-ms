import sqlite3
import random
from datetime import datetime

# Conectar a la base de datos (crea la DB si no existe)
conn = sqlite3.connect('prisma/dev.db')  # Cambiar al camino de tu base de datos
cursor = conn.cursor()

# Función para generar datos aleatorios para productos
def generate_product_data():
    names = [f"Product {i}" for i in range(1, 101)]
    descriptions = ["High quality product", "Affordable price", "Limited edition", None]
    name = random.choice(names)
    description = random.choice(descriptions)
    price = round(random.uniform(5.0, 100.0), 2)  # Precio entre 5.00 y 100.00
    stock = random.randint(0, 50)  # Stock entre 0 y 50
    image = f"https://example.com/images/{name.replace(' ', '_').lower()}.jpg"

    # Asigna las fechas actuales para createdAt y updatedAt
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    return (name, description, price, stock, image, now, now)  # Incluye las fechas

# Insertar 100 productos
for _ in range(100):
    product_data = generate_product_data()
    cursor.execute('''
    INSERT INTO Product (name, description, price, stock, image, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', product_data)

# Guardar cambios y cerrar la conexión
conn.commit()
conn.close()

print("Se han insertado 100 productos aleatorios en la base de datos.")