import React from "react";
import FinanceImg from "@/public/fin.png";
import Image from "next/image";
import Footer from "./components/Footer";
import FinanceIcon from "@/public/financeIcon.svg";
import CarouselItem1 from "@/public/carousel1.jpg";
import CarouselItem2 from "@/public/carousel2.jpg";
import CarouselItem3 from "@/public/carousel3.jpg";
import CarouselItem4 from "@/public/carousel4.jpg";
import CarouselItem5 from "@/public/carousel5.jpg";
import CarouselItem6 from "@/public/carousel6.jpg";

export default function Home() {
  const carouselItems = [
    CarouselItem1,
    CarouselItem2,
    CarouselItem3,
    CarouselItem4,
    CarouselItem5,
    CarouselItem6,
  ];

  return (
    <main>
      <div
        className="overflow-x-hidden overflow-y-auto scrollNone absolute top-[4rem] left-[13rem] bg-blue-50"
        style={{
          height: "calc(100svh - 4rem)",
          width: "calc(100vw - 13rem)",
        }}
      >
        <div className="flex w-full justify-center items-center mt-3 mb-3">
          <div className="bg-blue-200 min-w-[100px] min-h-[100px] flex justify-center items-center mr-2 rounded-full border-4 border-solid border-white">
            <Image src={FinanceIcon} alt="logo" width={85} />
          </div>
          <p className="p-4 text-center text-gray-700 font-bold font-serif text-5xl">
            InvestIQ
          </p>
        </div>
        <div className="flex items-center w-full">
          <Image src={FinanceImg} alt="logo" className="m-auto" />
        </div>
        <p className="p-4 w-full text-center text-gray-700 font-bold font-serif text-4xl mt-4">
          Control Your Finances
        </p>
        <p className="w-full text-center font-serif p-2 pl-14 pr-14 text-gray-700">
          Meet InvestIQ, the next generation of financial management and billing
          sofiware, that not only helps you manage your finances but also helps
          you invest in the right places. It records your financial
          transactions, pays your bills, and automate your investments on
          monthly basis.
        </p>
        <div className="carousel carousel-center mt-2 h-[42vh] p-[0.5vw] ">
          {carouselItems.map((item, index) => (
            <div className="carousel-item" key={index}>
              <Image
                src={item}
                alt="Pizza"
                className="h-[40vh] w-[32vw] ml-[0.5vw] mr-[0.5vw]"
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </main>
  );
}
