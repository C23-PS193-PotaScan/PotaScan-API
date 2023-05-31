import db from "../config/Database.js";
import response  from '../response.js';
import Article from '../models/articleModel.js'
import { request } from "express";

export const getListArticle = async(req, res) => {
    try {
        const article = await Article.findAll({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image']
        })
        if(article.length > 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data: article
            })
        }else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Data not found'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getArticleById = async(req, res) => {
    try {
        const articleId = req.params.articleId
        const article = await Article.findOne({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image'],
            where: {
                articleId: articleId
            }
        });
    
        if (!article) {
            res.status(404).json({
                message: "Article not found"
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data : article
            });
        }
    } catch (error) {
        console.log(error)
    }

};

// export const getArticleByCategory = (req, res) => {
//     const category = req.params.categoryberita
//     const sqlQuery = `SELECT * FROM artikels WHERE category = '${category}'`;
//     db.query(sqlQuery, (err, result) => {
//         if (err) throw err
//         response(200, "Response Success", result, res)
//   })
// }

export const getArticleByCategory = async(req, res) => {
    try {
        const category = req.params.category
        const article = await Article.findOne({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image'],
            where: {
                category: category
            }
        });

        if (!artcle) {
            res.status(404).json({
                message: "Article not found"
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data : article
            });
        }
    } catch (error) {
        console.log(error)
    }

};

export const postArticle = async(req, res) => {
    const { articleId, title, category, date, writer, mainContent, image } = req.body;
    const article = new Article({
        articleId,
        title,
        category,
        date,
        writer,
        mainContent,
        image,
    });

    try {
        await article.save();
        res.status(201).json({
            message: "Article added successfully",
            article,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const updateArticle = async (req, res) => {
    const { articleId, title, category, date, writer, mainContent, image } = req.body;
    const article = await Article.findOne({
      where: {
        articleId: articleId
      }
    });
  
    if (!article) {
      res.status(404).json({
        message: "Article not found"
      });
      return;
    }
  
    article.title = title;
    article.category = category;
    article.date = date;
    article.writer = writer;
    article.mainContent = mainContent;
    article.image = image;
  
    await article.save();
  
    res.status(200).json({
      message: "Article successfully changed",
      article,
    });
  };

// export const deleteArticle = (req, res) => {
//     const { articleId } = req.body
//     const sqlQuery = `DELETE FROM artikels WHERE articleId = '${articleId}'`
//     db.query(sqlQuery, (err, result) => {
//         if (err) response(500, "invalid", "error", res)

//         if (result?.affectedRows) {
//             const data = {
//                 isDeleted: result.affectedRows,
//             }
//         response(200, "delete", "data delet sukses", res)
//          } else {
//             response(404, "user not found", "error", res)
//         }
//     })
// }

export const deleteArticle = async (req, res) => {
    const articleId = req.params.articleId
    const article = await Article.findOne({
      where: {
        articleId: articleId
      }
    });
  
    if (!article) {
      res.status(404).json({
        message: "Article not found"
      });
      return;
    }
  
    await article.destroy();
  
    res.status(200).json({
      message: "Article successfully deleted",
    });
  };

