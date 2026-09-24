import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input } from "components/compat/bootstrap";
import axios from "axios";
import Link from "components/compat/Link";
import article1 from "public/images/e-commerce/home/article1.jpg";
import article2 from "public/images/e-commerce/home/article2.jpg";
import InstagramWidget from "components/e-commerce/Instagram";

import Head from "components/compat/Head";
import s from "./Blog.module.scss";
import { blogSchema, pageResultSchema, type Blog } from "types/domain";

type BlogListItem = Blog & {
  author_name?: string;
  epigraph?: string;
  createdAt?: string | Date;
};

const Index = () => {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);

  useEffect(() => {
    axios
      .get("/blogs")
      .then((res) => {
        const result = pageResultSchema(blogSchema).parse(res.data);
        setBlogs(result.rows as BlogListItem[]);
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="keywords" content="flatlogic, react templates" />
        <meta name="author" content="Flatlogic LLC." />
        <meta charSet="utf-8" />

        <meta
          property="og:title"
          content="Flatlogic - React, Vue, Angular and Bootstrap Templates and Admin Dashboard Themes"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://flatlogic-ecommerce.herokuapp.com/"
        />
        <meta
          property="og:image"
          content="https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"
        />
        <meta
          property="og:description"
          content="Beautifully designed web application template built with React and Bootstrap to create modern apps and speed up development"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="Flatlogic" />
        <meta name="twitter:site" content="@flatlogic" />
      </Head>
      <Container className={`mb-5 ${s.blogPage}`} style={{ marginTop: 32 }}>
        <Row>
          <Col xs={12} lg={8}>
            <h3 className="fw-bold mb-5">Blog</h3>
            {blogs.length > 0 &&
              blogs?.map((post) => {
                return (
                  <div className={s.blogPost} key={post.id}>
                    <div>
                      <Link href={`blog/article/${post.id}`}>
                        <a className={s.blogPostImgWrap}>
                          <img
                            src={post?.hero_image[0]?.publicUrl}
                            alt="img1"
                            className="mb-4 img-fluid"
                          />
                        </a>
                      </Link>
                      <h6 className={`${s.author_name}`}>
                        {post?.author_name}
                      </h6>
                      <Link href={`blog/article/${post.id}`}>
                        <a className={`text-dark ${s.post_title}`}>
                          <h4 className="fw-bold">{post?.title}</h4>
                        </a>
                      </Link>
                      <p className={`${s.post_epigraph}`}>{post.epigraph} </p>
                      <p className={`${s.post_date}`}>
                        {post.createdAt?.toString().slice(0, 10)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </Col>
          <Col xs={12} lg={4}>
            <h3 className="fw-bold mb-4">Search</h3>
            <Input
              type="search"
              name="text"
              id="exampleEmail"
              className="w-100 blog-search"
              placeholder={"Index in blog"}
            />
            <hr className={"my-5"} />
            <h6 className={"text-uppercase fw-bold mb-4"}>Cathegories</h6>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Basic</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>3</p>
            </div>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Creative</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>6</p>
            </div>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Offers & Deals</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>1</p>
            </div>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Decorations</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>12</p>
            </div>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Gift Cards</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>3</p>
            </div>
            <div
              className={`${s.categroryWrapper} d-flex justify-content-between mt-3`}
            >
              <p className={s.categoryLink}>
                <Link href={"/blog/article"}>
                  <a className={"text-dark"}>Classic Collection</a>
                </Link>
              </p>
              <p className={s.categoryAmount}>2</p>
            </div>
            <hr className={"my-5"} />
            <h3 className={"fw-bold mb-5"}>Recent Posts</h3>
            <Row>
              <Col xs={12} className={"mb-4 d-flex flex-column"}>
                <Link href={"/blog/article"}>
                  <a>
                    <img
                      src={article1}
                      className={"img-fluid"}
                      alt={"article"}
                    />
                  </a>
                </Link>
                <p className={"mt-3 text-muted mb-0"}>March 12, 2020</p>
                <Link href={"/blog/article"}>
                  <a>
                    <h6
                      className={"fw-bold font-size-base mt-1"}
                      style={{ fontSize: 16, color: "#232323" }}
                    >
                      What is Lorem Ipsum?
                    </h6>
                  </a>
                </Link>
                <Link href={"/blog/article"}>
                  <a>
                    <h6
                      style={{ fontSize: 16 }}
                      className={"fw-bold text-primary"}
                    >
                      Read More
                    </h6>
                  </a>
                </Link>
              </Col>
              <Col xs={12} className={"mb-4 d-flex flex-column"}>
                <Link href={"/blog/article"}>
                  <a>
                    <img
                      src={article2}
                      className={"img-fluid"}
                      alt={"article2"}
                    />
                  </a>
                </Link>
                <Link href={"/blog/article"}>
                  <a>
                    <p className={"mt-3 text-muted mb-0"}>March 12, 2020</p>
                  </a>
                </Link>
                <Link href={"/blog/article"}>
                  <a>
                    <h6
                      className={"fw-bold font-size-base mt-1"}
                      style={{ fontSize: 16, color: "#232323" }}
                    >
                      Best Examples of Maximalism
                    </h6>
                  </a>
                </Link>
                <Link href={"/blog/article"}>
                  <a>
                    <h6
                      style={{ fontSize: 16 }}
                      className={"fw-bold text-primary"}
                    >
                      Read More
                    </h6>
                  </a>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(_context: unknown) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Index;
