import React, { useEffect, useState } from "react";
import s from "../../index.module.scss";

const countdownDate = new Date("12/25/2021").getTime();

const Countdown = () => {
  const [state, setState] = useState({
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const distanceToDate = countdownDate - Date.now();
      if (distanceToDate <= 0) return false;

      const days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
      setState({
        days: String(days),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
      return true;
    };

    if (!updateCountdown()) return;

    const countdownInterval = window.setInterval(() => {
      if (!updateCountdown()) window.clearInterval(countdownInterval);
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, []);

  return (
    <div className={s.promo__indication}>
      <section className={s.promo__indication__block}>
        <h5 className="mb-0">{parseInt(state.days) < 0 ? "0" : state.days}</h5>
        <p className={"mb-0"}>days</p>
      </section>
      <section className={s.promo__indication__block}>
        <h5 className="mb-0">
          {parseInt(state.hours) < 0 ? "0" : state.hours}
        </h5>
        <p className={"mb-0"}>hours</p>
      </section>
      <section className={s.promo__indication__block}>
        <h5 className="mb-0">
          {parseInt(state.minutes) < 0 ? "0" : state.minutes}
        </h5>
        <p className={"mb-0"}>mins</p>
      </section>
      <section className={s.promo__indication__block}>
        <h5 className="mb-0">
          {parseInt(state.seconds) < 0 ? "0" : state.seconds}
        </h5>
        <p className={"mb-0"}>secs</p>
      </section>
    </div>
  );
};

export default Countdown;
