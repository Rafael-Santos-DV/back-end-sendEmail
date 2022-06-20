import axios from 'axios';
import { transport } from '../configs/mail';

type DataType = {
  data: {
    email: string;
    username: string;
  };
};

type prevType = {
  items: Array<Record<string, unknown>>;
};

export default {
  key: 'sendEmail',
  async handle({ data: { email, username } }: DataType) {
    let amountOfProducts = [];

    const data = (
      await axios.get(
        'https://vtexstore.codeby.com.br/api/catalog_system/pub/products/search',
      )
    ).data;

    data.forEach((value: prevType) => {
      value.items.forEach((product) => {
        amountOfProducts.push(product);
      });
    });

    let html = `
            <!DOCTYPE html>
            <html lang="pt-br">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <style>
                  :root {
                    --blue: #008bea;
                  }
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  #content {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    border-radius: 10px;
                    row-gap: 20px;
                  }

                  #content img {
                    width: 100%;
                    max-width: 100px;
                  }

                  #content h1 {
                    font-size: 1rem;
                    color: var(--blue);
                  }

                  #content p,
                  #content span {
                    font-size: 0.8rem;
                    font-weight: bold;
                  }

                  #content div {
                    display: flex;
                    align-items: center;
                    column-gap: 10px;
                  }

                  #content div span.number,
                  a {
                    color: var(--blue);
                    font-size: 0.8rem;
                  }
                </style>
              </head>
              <body>
                <main id="content">
                  <img
                    src="https://codebyproject.vercel.app/_next/static/media/logo.1906415d.png"
                    alt="Codeby"
                  />
                  <h1>Olá ${username},</h1>

                  <p>Obrigado pela inscrição</p>

                  <div>
                    <p>Quantidade de produtos:</p>
                    <span class="number">${amountOfProducts.length}</span>
                  </div>

                  <div>
                    <span>Visite nosso site: </span>
                    <a href="https://codebyproject.vercel.app/" target="_blank"
                      >https://codebyproject.vercel.app/</a
                    >
                  </div>
                </main>
              </body>
      </html>
    `;

    await transport.sendMail({
      from: `${username} <${email}>`,
      to: `${email}`,
      subject: 'Produtos Codeby',
      html,
    });
  },
};
