import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const keanggotaanTinggi = [
    { label: "Sangat Pendek", start: 0, end: 120 },
    { label: "Pendek", start: 115, end: 145 },
    { label: "Sedang", start: 140, end: 165 },
    { label: "Tinggi", start: 160, end: 185 },
    { label: "Sangat Tinggi", start: 180, end: "unlimited" },
  ];
  const keanggotaanBerat = [
    { label: "Sangat Kurus", start: 0, end: 45 },
    { label: "Kurus", start: 40, end: 55 },
    { label: "Biasa", start: 50, end: 65 },
    { label: "Berat", start: 60, end: 85 },
    { label: "Sangat Berat", start: 80, end: "unlimited" },
  ];

  const kategoriSehat = [
    { label: "TS", index: 0.2 },
    { label: "AS", index: 0.4 },
    { label: "S", index: 0.6 },
    { label: "SS", index: 0.8 },
  ];

  const kaidahSehat = [
    [
      kategoriSehat[3],
      kategoriSehat[2],
      kategoriSehat[1],
      kategoriSehat[0],
      kategoriSehat[0],
    ],
    [
      kategoriSehat[2],
      kategoriSehat[3],
      kategoriSehat[2],
      kategoriSehat[1],
      kategoriSehat[0],
    ],
    [
      kategoriSehat[1],
      kategoriSehat[3],
      kategoriSehat[3],
      kategoriSehat[1],
      kategoriSehat[0],
    ],
    [
      kategoriSehat[0],
      kategoriSehat[2],
      kategoriSehat[3],
      kategoriSehat[2],
      kategoriSehat[0],
    ],
    [
      kategoriSehat[0],
      kategoriSehat[1],
      kategoriSehat[3],
      kategoriSehat[2],
      kategoriSehat[1],
    ],
  ];

  function naik(a, b, x) {
    return (x - a) / (b - a);
  }

  function turun(a, b, x) {
    return (b - x) / (b - a);
  }

  const input1 = 161.5;
  const input2 = 41;

  let result1A;
  let result1B;
  let result2A;
  let result2B;

  let input1IA;
  let input1IB;
  let input2IA;
  let input2IB;

  let batas1A;
  let batas2A;
  let batas1B;
  let batas2B;

  function minimum(a, b) {
    if (a <= b) {
      return a;
    } else {
      return b;
    }
  }

  function findMax(x) {
    let i;
    for (let j = 0; j < x.length; j++) {
      if (j == 0) {
        i = x[j];
      } else {
        if (x[j].index > i.index) {
          i = x[j];
        }
      }
    }

    return i;
  }

  useEffect(() => {
    for (let i = 0; i < keanggotaanTinggi.length; i++) {
      if (input1 <= keanggotaanTinggi[i].end) {
        batas1A = keanggotaanTinggi[i + 1].start;
        batas1B = keanggotaanTinggi[i].end;
        input1IA = i;
        input1IB = i + 1;
        break;
      }
    }
    for (let i = 0; i < keanggotaanBerat.length; i++) {
      if (input2 <= keanggotaanBerat[i].end) {
        batas2A = keanggotaanBerat[i + 1].start;
        batas2B = keanggotaanBerat[i].end;
        input2IA = i;
        input2IB = i + 1;
        break;
      }
    }

    result1A = turun(batas1A, batas1B, input1);
    result1B = naik(batas1A, batas1B, input1);
    result2A = turun(batas2A, batas2B, input2);
    result2B = naik(batas2A, batas2B, input2);

    let r1;
    let r2;
    let r3;
    let r4;

    r1 = minimum(result1A, result2A);
    r2 = minimum(result1B, result2A);
    r3 = minimum(result1A, result2B);
    r4 = minimum(result1B, result2B);

    let f1 = { label: kaidahSehat[input1IA][input2IA].label, index: r1 };
    let f2 = { label: kaidahSehat[input1IB][input2IA].label, index: r2 };
    let f3 = { label: kaidahSehat[input1IA][input2IB].label, index: r3 };
    let f4 = { label: kaidahSehat[input1IB][input2IB].label, index: r4 };

    let f = [f1, f2, f3, f4];

    console.log("Max Method : " + findMax(f).index + " " + findMax(f).label);

    let ks1;
    kategoriSehat.map((x, idx) => {
      if (x.label == f1.label) {
        ks1 = idx;
      }
    });
    let ks2;
    kategoriSehat.map((x, idx) => {
      if (x.label == f2.label) {
        ks2 = idx;
      }
    });
    let ks3;
    kategoriSehat.map((x, idx) => {
      if (x.label == f3.label) {
        ks3 = idx;
      }
    });
    let ks4;
    kategoriSehat.map((x, idx) => {
      if (x.label == f4.label) {
        ks4 = idx;
      }
    });

    let DI;
    DI =
      (f1.index * kategoriSehat[ks1].index +
        f2.index * kategoriSehat[ks2].index +
        f3.index * kategoriSehat[ks3].index +
        f4.index * kategoriSehat[ks4].index) /
      (f1.index + f2.index + f3.index + f4.index);
    console.log("Crisp Decision Index : " + DI);

    let fi1;
    let fi2;

    for (let i = 0; i < kategoriSehat.length; i++) {
      if (DI <= kategoriSehat[i].index) {
        fi1 = i - 1;
        fi2 = i;
        break;
      }
    }

    let resultF1;
    let resultF2;
    resultF1 = turun(kategoriSehat[fi1].index, kategoriSehat[fi2].index, DI);
    resultF2 = naik(kategoriSehat[fi1].index, kategoriSehat[fi2].index, DI);
    console.log(
      "Fuzzy Decision Index : \n" +
        kategoriSehat[fi1].label +
        " : " +
        resultF1 +
        "\n" +
        kategoriSehat[fi2].label +
        " : " +
        resultF2
    );
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Logika Fuzzy - Kesehatan | Alfian Prisma Yopiangga</title>
        <meta
          name="description"
          content="Logika Fuzzy Praktikum Kecerdasan Komputasional"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
