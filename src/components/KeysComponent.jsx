import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gifDesktop from "../assets/test-1.gif";
import stopDesktop from "../assets/stop.gif";
import deleteDesktop from "../assets/delete-animated.gif";
import backgroundDesktop from "../assets/background-piplup-min.gif";

// Imágenes adaptadas para móvil
import gifMobile from "../assets/keys-mov.gif";
import stopMobile from "../assets/stop-mobile.gif";
import deleteMobile from "../assets/delete-mov.gif";
import backgroundMobile from "../assets/background-mov.gif";

const KeysComponent = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const stopImageRef = useRef(null);
  const gifImageRef = useRef(null);
  const deleteImageRef = useRef(null);
  const textRef = useRef(null);
  const lastScroll = useRef(0);
  const scrollTimeout = useRef(null);
  const [visibleText, setVisibleText] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fullText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.';
  const totalCharacters = fullText.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ autoKillThreshold: 0 });

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      const maxScroll = scrollContainerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      const charCount = Math.floor(progress * totalCharacters); 7
      setVisibleText(fullText.slice(0, charCount));

      if (scrollY > lastScroll.current) {
        gsap.set(gifImageRef.current, { opacity: 1 });
        gsap.set(stopImageRef.current, { opacity: 0 });
        gsap.set(deleteImageRef.current, { opacity: 0 });
      } else if (scrollY < lastScroll.current) {
        gsap.set(gifImageRef.current, { opacity: 0 });
        gsap.set(stopImageRef.current, { opacity: 0 });
        gsap.set(deleteImageRef.current, { opacity: 1 });
      }

      lastScroll.current = scrollY;

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY === lastScroll.current) {
          gsap.set(gifImageRef.current, { opacity: 0 });
          gsap.set(deleteImageRef.current, { opacity: 0 });
          gsap.set(stopImageRef.current, { opacity: 1 });
        }
      }, 100);
    };

    ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: updateVisibility,
      scrub: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clearTimeout(scrollTimeout.current);
    };
  }, [fullText, totalCharacters]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            backgroundImage: `url(${isMobile ? backgroundMobile : backgroundDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: -2,
            opacity: 1,
          }}
        >
          <div
            ref={textRef}
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, 0%)",
              fontSize: "1.85rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              width: "40%",
            }}
          >
            {visibleText}
          </div>
        </div>

        <div
          ref={stopImageRef}
          style={{
            backgroundImage: `url(${isMobile ? stopMobile : stopDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: -1,
            opacity: 1,
          }}
        ></div>

        <div
          ref={gifImageRef}
          style={{
            backgroundImage: `url(${isMobile ? gifMobile : gifDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: -1,
            opacity: 0,
          }}
        ></div>

        <div
          ref={deleteImageRef}
          style={{
            backgroundImage: `url(${isMobile ? deleteMobile : deleteDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: -1,
            opacity: 0,
          }}
        ></div>

        <div ref={scrollContainerRef} style={{ height: "600vh", background: "transparent" }}></div>
      </div>

      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <h1>¡caca!</h1>
      </div>
    </>
  );
};

export default KeysComponent;
