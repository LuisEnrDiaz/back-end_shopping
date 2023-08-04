<p align='center'>
    <img  width=800 align=center src='./public/assets/readme.png' alt='shopping-backend' />
<p/>

<h1 align="center">
Shopping back-end
</h1>

![Estado del proyecto](https://img.shields.io/badge/ESTADO-%20COMPLETO-green)
![tecnologias](https://img.shields.io/badge/nodejs-white.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJyYW5kLW5vZGVqcyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTkgOXY4LjA0NGEyIDIgMCAwIDEgLTIuOTk2IDEuNzM0bC0xLjU2OCAtLjlhMyAzIDAgMCAxIC0xLjQzNiAtMi41NjF2LTYuNjM1YTMgMyAwIDAgMSAxLjQzNiAtMi41Nmw2IC0zLjY2N2EzIDMgMCAwIDEgMy4xMjggMGw2IDMuNjY3YTMgMyAwIDAgMSAxLjQzNiAyLjU2MXY2LjYzNGEzIDMgMCAwIDEgLTEuNDM2IDIuNTZsLTYgMy42NjdhMyAzIDAgMCAxIC0zLjEyOCAwIj48L3BhdGg+PHBhdGggZD0iTTE3IDloLTMuNWExLjUgMS41IDAgMCAwIDAgM2gyYTEuNSAxLjUgMCAwIDEgMCAzaC0zLjUiPjwvcGF0aD48L3N2Zz4=)
![tecnologias](https://img.shields.io/badge/TypeScript-white?logo=typescript)
![tecnologias](https://img.shields.io/badge/MongoDB-white.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJyYW5kLW1vbmdvZGIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMiAzdjE5Ij48L3BhdGg+PHBhdGggZD0iTTE4IDExLjIyN2MwIDMuMjczIC0xLjgxMiA0Ljc3IC02IDkuMjczYy00LjE4OCAtNC41MDMgLTYgLTYgLTYgLTkuMjczYzAgLTQuNDU0IDMuMDcxIC02LjkyNyA2IC05LjIyN2MyLjkyOSAyLjMgNiA0Ljc3MyA2IDkuMjI3eiI+PC9wYXRoPjwvc3ZnPg==)

Puedes ver informacion util (solo visual) en este link: [Solo tienes que dar clic aqui](https://back-end-shopping.netlify.app/))

## Instalación

    1  Clona este proyecto.

    2  Ve a la carpeta del proyecto.
        `back-end_shopping`

    3  Instala las dependencias.
        `npm install` | `npm i`

    4  Corre en local.
        `npm run dev`

    5  Ve a la Url que te indica o el por defecto.
        `http://localhost:7700/`

# Que es Shopping?

Shpping es un proyecto personal donde simulo la interaccion de una tienda online.

En el podras hcaer lo mas basico como.

-   Registrarte.
-   Iniciar secion.
-   Añadir a Favoritos.
-   Quitar de Favoritos.
-   Añadair al Carrito.
-   Quitar del Carrito.

Si eres Administrador podras.

-   Crear Productos.
-   Eliminar Productos.

# Metodos

Usuarios

    GET     users/:id
    POST    users/login
    POST    users/register
    DELETE  users/:id
    PATCH   users/addFavorites
    PATCH   users/removeFavorites

Productos

    GET     products/:id
    GET     products/
    PATCH   products/
    POST    products/
    DELETE  products/

Carrito

    GET     carts/:id
    PATCH   carts/addProductCart
    PATCH   carts/removeProductCart
    PATCH   carts/removeAllProducts

# Tipado

Usuario

    {
        id: string,
        name: string,
        email: string,
        password: string,
        favorites: Array<string>,
        cart: string,
        admin: boolean
    }

Producto

    {
        id: string,
        image: string,
        name: string,
        details: string,
        price: number,
        stoke: number
    }

Carrito

    {
        id: string,
        products: Array<string>,
        user: string
    }
