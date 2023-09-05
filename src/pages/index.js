import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import dummy1 from "../assets/dummy/1.jpg";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([0, 300]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /* get data */

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(url + `api/users?page=2`)
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
    <>
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {data.map((item, index) => (
          <div className="container mt-5 mb-5" key={index}>
            <div className="card" style={{ width: "20rem" }}>
              <Image
                src={item.avatar}
                alt="Card image cap"
                className="img-fluid card-img-top"
                width={200}
                height={200}
              />
              <div className="card-body">
                <h5 className="card-title">{item.email}</h5>
                <p className="card-text">
                  {item.first_name} {item.last_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
