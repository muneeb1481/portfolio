# Django Laptop Selling E-commerce Platform with AI Integration

A **full-stack e-commerce web application** built with Django for buying and selling laptops, enhanced with AI-powered features including product recommendations and intelligent search. The platform provides a complete online shopping experience from browsing and filtering to cart management and order tracking.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [AI Features](#ai-features)
- [Database Models](#database-models)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Author](#author)

---

## About the Project

This project is a production-ready e-commerce platform specifically designed for the laptop market. It combines a robust Django backend with a clean, responsive front-end built using HTML, CSS, and JavaScript. The AI integration layer adds smart product recommendations and enhanced search to improve the shopping experience.

The platform supports the full e-commerce lifecycle: product listings with detailed specifications, user registration and authentication, cart and checkout flow, order management, and an admin panel for inventory control.

---

## Features

### Customer-Facing
- **Product Catalog** — Browse laptops with detailed specs (RAM, storage, processor, display, brand)
- **Search & Filter** — Filter by brand, price range, RAM, storage, and processor type
- **AI-Powered Recommendations** — Get personalized laptop suggestions based on browsing and purchase history
- **Product Detail Pages** — Full specifications, images, and pricing for each laptop
- **Shopping Cart** — Add, remove, and update quantities before checkout
- **User Authentication** — Register, log in, and manage your profile
- **Order History** — View past orders and their current status
- **Responsive Design** — Works on desktop, tablet, and mobile

### Admin / Seller
- **Django Admin Panel** — Full product, order, and user management
- **Inventory Management** — Add, edit, and remove laptop listings
- **Order Management** — View and update order statuses
- **Sales Dashboard** — Overview of orders and revenue

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Django | Web framework (backend, ORM, admin) |
| SQLite | Development database |
| JavaScript | Frontend interactivity and dynamic UI |
| HTML5 | Page structure and templates |
| CSS3 | Styling and layout |
| Bootstrap | Responsive UI components |
| Django Templates | Server-side HTML rendering |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│        HTML + CSS + JavaScript               │
│              (Bootstrap UI)                  │
└───────────────────┬─────────────────────────┘
                    │ HTTP Requests
                    ▼
┌─────────────────────────────────────────────┐
│              Django Backend                  │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Views   │  │  Models  │  │   URLs    │  │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘  │
│       │              │              │         │
│  ┌────▼──────────────▼──────────────▼──────┐ │
│  │            Django ORM                   │ │
│  └────────────────────┬────────────────────┘ │
│                        │                      │
│  ┌─────────────────────▼──────────────────┐  │
│  │            AI Layer                    │  │
│  │   (Recommendation Engine / Search)     │  │
│  └────────────────────────────────────────┘  │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  SQLite Database │
         └──────────────────┘
```

---

## Project Structure

```
Django--Laptop-Selling-Ecommerce-Platform---AI-Integrate--master/
│
├── ecomm/                      # Main Django project directory
│   ├── settings.py             # Project settings
│   ├── urls.py                 # Root URL configuration
│   ├── wsgi.py                 # WSGI entry point
│   │
│   ├── products/               # Products app
│   │   ├── models.py           # Laptop, Category models
│   │   ├── views.py            # Product listing, detail, search views
│   │   ├── urls.py             # Product URL patterns
│   │   └── templates/          # Product HTML templates
│   │
│   ├── cart/                   # Shopping cart app
│   │   ├── models.py           # Cart, CartItem models
│   │   ├── views.py            # Add/remove/update cart views
│   │   └── templates/          # Cart HTML templates
│   │
│   ├── orders/                 # Orders app
│   │   ├── models.py           # Order, OrderItem models
│   │   ├── views.py            # Checkout, order history views
│   │   └── templates/          # Order HTML templates
│   │
│   ├── accounts/               # User authentication app
│   │   ├── views.py            # Register, login, profile views
│   │   └── templates/          # Auth HTML templates
│   │
│   ├── ai/                     # AI integration module
│   │   └── recommendations.py  # Recommendation engine logic
│   │
│   └── static/                 # CSS, JS, and image assets
│       ├── css/
│       ├── js/
│       └── images/
│
├── requirements.txt            # Python dependencies
├── .gitattributes
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muneeb1481/Django--Laptop-Selling-Ecommerce-Platform---AI-Integrate--master.git
   cd Django--Laptop-Selling-Ecommerce-Platform---AI-Integrate--master
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate      # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   cd ecomm
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser for the admin panel:
   ```bash
   python manage.py createsuperuser
   ```

6. (Optional) Load sample laptop data:
   ```bash
   python manage.py loaddata sample_laptops.json
   ```

### Running the App

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` to view the store.  
Visit `http://127.0.0.1:8000/admin` to access the admin panel.

---

## AI Features

### Product Recommendation Engine

The AI recommendation system suggests laptops to users based on:
- **Collaborative Filtering** — Recommends laptops popular among users with similar purchase history
- **Content-Based Filtering** — Suggests laptops with similar specifications to ones a user has viewed or purchased
- **Hybrid Approach** — Combines both methods for better recommendations

Recommendations are displayed on:
- The product detail page ("You might also like...")
- The user's homepage after login
- The cart page before checkout

### Smart Search

The search feature goes beyond exact keyword matching:
- Handles partial matches and common misspellings
- Understands spec-based queries (e.g., "16GB RAM laptop under 1000")
- Returns results ranked by relevance

---

## Database Models

### Laptop
```python
class Laptop(models.Model):
    name        # Product name
    brand       # Manufacturer
    price       # Price in PKR/USD
    processor   # CPU specification
    ram         # RAM in GB
    storage     # Storage in GB
    display     # Screen size in inches
    image       # Product image
    stock       # Available quantity
    description # Full product description
```

### Order
```python
class Order(models.Model):
    user            # Foreign key to User
    items           # ManyToMany through OrderItem
    total_price     # Calculated order total
    status          # pending / confirmed / shipped / delivered
    created_at      # Order timestamp
    shipping_address
```

---

## Contributing

Contributions are welcome! Suggested improvements:
- Payment gateway integration (Stripe, JazzCash, EasyPaisa)
- Product reviews and ratings
- Wishlist functionality
- Email notifications for order updates
- REST API with Django REST Framework for mobile app support
- Deployment configuration for production (PostgreSQL, Nginx, Gunicorn)

---

## Author

**Muneeb Ur Rehman**  
GitHub: [@muneeb1481](https://github.com/muneeb1481)
