import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname } from "path";
import matter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";
import { html } from "satori-html";
import satori from "satori";

const dir = "./src/content/lessons";
try {
  const files = await readdir(dir);
  const logo = await readFile(
    new URL("./public/img/javascripted-logo.svg", import.meta.url),
    {
      encoding: "base64",
      width: 300,
      height: 44,
    }
  );

  for (const file of files) {
    if (extname(file) !== ".mdx") {
      continue;
    }

    const content = await readFile(join(dir, file), "utf8");
    const result = matter(content);

    await generateOgImage({
      title: result.data.name,
      slug: result.data.name.toLowerCase(),
      description: result.data.tagline,
      logo
    });
  }
} catch (err) {
  console.error("Error:", err);
}

async function generateOgImage({ title, slug, description, logo }) {
  const svg = await satori(
    html` <style>
        div {
          display: flex;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          height: 630px;
          background-color: #0f0d0e;
          padding: 80px;
        }

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bottom {
          display: flex;
          flex-direction: column;
          width: 90%;
          flex-basis: 100%;
          justify-content: flex-end;
          padding-bottom: 40px;
        }

        .logo {
          width: 300px;
          height: 44px;
        }

        .install {
          color: #f9f4da;
          font-size: 32px;
          font-family: "Fira Code";
        }

        .install span {
          color: #0ba95b;
          padding-right: 16px;
        }

        .title {
          margin-top: 16px;
          color: #12b5e5;
          font-size: 64px;
          font-family: "Outfit Bold";
          font-weight: 700;
        }

        .description {
          margin-top: 16px;
          color: #f9f4da;
          font-family: "Outfit";
          font-size: 40px;
          font-weight: 400;
        }
      </style>
      <div class="wrapper">
        <div class="top">
          <img class="logo" src="data:image/svg+xml;base64,${logo}" />
          <div class="install"><span>></span> npm i @JuditKaramazov/JavaScripted</div>
        </div>
        <div class="bottom">
          <div class="title">${title}</div>
          <div class"description">${description}</div>
        </div>
      </div>`,
    {
      fonts: [
        {
          name: "Outfit",
          data: await readFile(
            new URL("./public/fonts/outfit-regular.ttf", import.meta.url)
          ),
          weight: "400",
          style: "normal",
        },
        {
          name: "Outfit Bold",
          data: await readFile(
            new URL("./public/fonts/outfit-bold.ttf", import.meta.url)
          ),
          weight: "700",
          style: "normal",
        },
        {
          name: "Fira Code",
          data: await readFile(
            new URL("./public/fonts/firacode-regular.ttf", import.meta.url)
          ),
          weight: "400",
          style: "normal",
        },
      ],
      width: 1200,
      height: 630,
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "original",
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  await writeFile(
    new URL(`./public/meta/${slug}.png`, import.meta.url),
    pngBuffer
  );
  console.log("✅", slug);
}
