import React from "react";
import { Link } from "react-router-dom";
import "./sign-in.scss";

export default function SignInPage() {
  return (
    <section className="container">
      <div className="columns is-multiline">
        <div className="column is-8 is-offset-2 wrapper">
          <div className="columns">
            <div className="column left">
              <h1 className="title is-1">Tiny Survey</h1>
              <h2 className="subtitle colored is-4">
                Like Google Forms but better.
              </h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis ex deleniti aliquam tempora libero excepturi vero
                soluta odio optio sed.
              </p>
            </div>
            <div className="column right has-text-centered">
              <h1 className="title is-4">Sign in</h1>
              <p className="description">Enjoy your alpha experience :)</p>
              <form>
                <Link to="/survey">
                  <button className="button is-block is-primary is-fullwidth is-medium">
                    Get started
                  </button>
                </Link>
                <br />
                <small>
                  <em>
                    Source code can be found on{" "}
                    <a
                      href="https://github.com/slashbit/tiny-survey"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </em>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
