import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const keanggotaanGRE = [
    { label: "Low", start: 0, end: 1200 },
    { label: "Medium", start: 800, end: 1800 },
    { label: "High", start: 1200, end: "unlimited" },
  ];
  const keanggotaanGPA = [
    { label: "Low", start: 0, end: 3.0 },
    { label: "Medium", start: 2.2, end: 3.8 },
    { label: "High", start: 3.0, end: "unlimited" },
  ];

  const kategoriNilai = [
    { label: "P", start: 0, end: 70, index: 60 },
    { label: "F", start: 60, end: 80, index: 70 },
    { label: "G", start: 70, end: 90, index: 80 },
    { label: "VG", start: 80, end: 100, index: 90 },
    { label: "E", start: 90, end: 100, index: 100 },
  ];

  const kaidahNilai = [
    [kategoriNilai[4], kategoriNilai[3], kategoriNilai[1]],
    [kategoriNilai[2], kategoriNilai[2], kategoriNilai[0]],
    [kategoriNilai[1], kategoriNilai[0], kategoriNilai[0]],
  ];

  function naik(a, b, x) {
    return (x - a) / (b - a);
  }

  function turun(a, b, x) {
    return (b - x) / (b - a);
  }

  const input1 = 1100;
  const input2 = 3.6;

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
    for (let i = 0; i < keanggotaanGRE.length; i++) {
      if (input1 <= keanggotaanGRE[i].end) {
        batas1A = keanggotaanGRE[i + 1].start;
        batas1B = keanggotaanGRE[i].end;
        input1IA = i;
        input1IB = i + 1;
        break;
      }
    }
    for (let i = 0; i < keanggotaanGPA.length; i++) {
      if (input2 <= keanggotaanGPA[i].end) {
        batas2A = keanggotaanGPA[i + 1].start;
        batas2B = keanggotaanGPA[i].end;
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

    let f1 = { label: kaidahNilai[input1IA][input2IA].label, index: r1 };
    let f2 = { label: kaidahNilai[input1IB][input2IA].label, index: r2 };
    let f3 = { label: kaidahNilai[input1IA][input2IB].label, index: r3 };
    let f4 = { label: kaidahNilai[input1IB][input2IB].label, index: r4 };

    let f = [f1, f2, f3, f4];

    console.log("Max Method : " + findMax(f).index + " " + findMax(f).label);

    let ks1;
    kategoriNilai.map((x, idx) => {
      if (x.label == f1.label) {
        ks1 = idx;
      }
    });
    let ks2;
    kategoriNilai.map((x, idx) => {
      if (x.label == f2.label) {
        ks2 = idx;
      }
    });
    let ks3;
    kategoriNilai.map((x, idx) => {
      if (x.label == f3.label) {
        ks3 = idx;
      }
    });
    let ks4;
    kategoriNilai.map((x, idx) => {
      if (x.label == f4.label) {
        ks4 = idx;
      }
    });

    let DI;
    DI =
      (f1.index * kategoriNilai[ks1].index +
        f2.index * kategoriNilai[ks2].index +
        f3.index * kategoriNilai[ks3].index +
        f4.index * kategoriNilai[ks4].index) /
      (f1.index + f2.index + f3.index + f4.index);
    console.log("Crisp Decision Index : " + DI);

    let fi1;
    let fi2;

    for (let i = 0; i < kategoriNilai.length; i++) {
      if (DI <= kategoriNilai[i].index) {
        fi1 = i - 1;
        fi2 = i;
        break;
      }
    }

    let resultF1;
    let resultF2;
    resultF1 = turun(kategoriNilai[fi1].index, kategoriNilai[fi2].index, DI);
    resultF2 = naik(kategoriNilai[fi1].index, kategoriNilai[fi2].index, DI);
    console.log(
      "Fuzzy Decision Index : \n" +
        kategoriNilai[fi1].label +
        " : " +
        resultF1 +
        "\n" +
        kategoriNilai[fi2].label +
        " : " +
        resultF2
    );
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Logika Fuzzy - Student | Alfian Prisma Yopiangga</title>
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
