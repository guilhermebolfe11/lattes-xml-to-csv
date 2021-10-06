import Article from "./Article";

class PublishedArticle {
  "ARTIGO-PUBLICADO":Article | Array<Article>;
  [key: string]: any;
}

export default PublishedArticle;