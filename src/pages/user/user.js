import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        console.log(res);
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  return (
    <div style={{ backgroundColor: "#f3f3f1" }} className="vh-100 w-100">
      <div className="container">
        <div className="row">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {data.map((item, index) => (
              <div className="col-sm-4">
                <div
                  className="mt-5 shadow-lg p-3 mb-5 bg-body rounded"
                  key={index}
                >
                  <SwiperSlide>
                    <div
                      className="card mt-5 mb-5"
                      style={{
                        border: "none",
                      }}
                    >
                      <Image
                        src={item.avatar}
                        alt="Card image cap"
                        className="img-fluid card-img-top"
                        width={80}
                        height={80}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.email}</h5>
                        <p className="card-text">
                          {item.first_name} {item.last_name}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
