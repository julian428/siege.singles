import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <header className="flex flex-col gap-2 w-full text-center py-8 items-center">
        <h2 className="text-h2 tracking-wide font-light">Welcome to</h2>
        <h1 className="text-h1 font-black text tracking-widest">
          <span className="italic text-action">S</span>iege{" "}
          <span className="italic text-action">S</span>ingles
        </h1>
        <Link
          href="/login"
          className="border-2 hover:border-action px-4 py-1 text-xl rounded-lg mt-12 transition-colors duration-700"
        >
          <span className="text-secondary hover:text-action transition-colors">
            L
          </span>
          <span className="text-secondary hover:text-action transition-colors">
            O
          </span>
          <span className="text-secondary hover:text-action transition-colors">
            G
          </span>
          <span className="text-secondary hover:text-action transition-colors">
            I
          </span>
          <span className="text-secondary hover:text-action transition-colors">
            N
          </span>
        </Link>
      </header>
      <main className="px-4 h-full w-full flex flex-col gap-24 text-xl font-medium tracking-wider items-center">
        <article className="max-w-6xl">
          <h3 className="text-h3 font-black mb-6 border-b-4 w-fit ml-6 border-action">
            About.
          </h3>
          <p>
            Laborum velit fugiat dolore ex ex consectetur deserunt reprehenderit
            culpa voluptate quis proident. Ullamco velit ipsum sunt et fugiat
            veniam ut. Nisi in nostrud consequat Lorem cillum dolore magna est
            ipsum ea enim aliqua. Proident sint adipisicing quis nisi deserunt.
            Enim sunt aliquip do veniam eu adipisicing elit nostrud quis aliquip
            id nulla voluptate. Quis cupidatat duis consectetur sint veniam in
            proident nostrud et amet veniam adipisicing ea culpa. Deserunt enim
            officia proident magna reprehenderit quis cupidatat ea. Velit cillum
            incididunt commodo ipsum occaecat et duis eiusmod reprehenderit
            culpa exercitation nostrud culpa dolore. Exercitation aliquip ut sit
            sint dolore velit nostrud officia elit reprehenderit cupidatat ad
            voluptate. Veniam dolor nostrud voluptate culpa in minim. Dolore
            proident quis cillum cupidatat. Excepteur non quis nisi culpa
            laborum eiusmod eiusmod fugiat ipsum ullamco nulla nulla cupidatat
            voluptate. Qui adipisicing duis qui aute veniam incididunt officia
            amet voluptate dolore pariatur quis.
          </p>
        </article>
        <article className="max-w-6xl">
          <h3 className="text-h3 font-black mb-6 border-b-4 w-fit ml-6 border-action">
            Usage.
          </h3>
          <p>
            Voluptate tempor eu sit dolor occaecat id. Minim dolore et ea minim
            laborum ut. Aliquip id sit labore excepteur tempor fugiat non ut ea
            exercitation. Nostrud deserunt ut excepteur irure adipisicing labore
            consectetur nostrud ex. Ad consectetur eiusmod nulla ut consequat
            labore irure. Aliquip Lorem magna id qui ea qui velit. Minim sint
            cupidatat in nulla veniam minim. Id quis ad dolor minim eiusmod amet
            aliqua ex mollit. Consequat dolore mollit veniam velit amet dolor.
          </p>
        </article>
        <footer className="sticky bottom-0 text-xs flex gap-8">
          <section>
            <h4>CEO:</h4>
            <i className="text-action">{process.env.NEXT_PUBLIC_CEO}</i>
          </section>
          <section>
            <h4>CTO:</h4>
            <i className="text-action">{process.env.NEXT_PUBLIC_CTO}</i>
          </section>
        </footer>
      </main>
    </>
  );
}
