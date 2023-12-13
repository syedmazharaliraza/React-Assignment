import { useEffect, useState } from "react";

const Gallery = () => {
  const [imageKey, setImageKey] = useState<string>("gallery-key");

  useEffect(() => {
    const interval = setInterval(() => {
      setImageKey((prev) => prev + Math.random());
    }, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto grid-cols-1 md:grid-cols-3 grid gap-8 p-4">
      {[...Array(9)].map((_, idx) => (
        <img
          src={`https://source.unsplash.com/random/200x200?sig=${idx}&${imageKey}`}
          key={idx}
          alt="random-image"
          loading="lazy"
          className="rounded-lg shadow-lg"
        />
      ))}
    </section>
  );
};

export default Gallery;
