import db from "../config/Database.js";
import response  from '../response.js';
import Artikel from '../models/articleModel.js'
import { request } from "express";

export const getListArticle = async(req, res) => {
    try {
        const artikel = await Artikel.findAll({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image']
        })
        if(artikel.length > 0){
            return res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data: artikel
            })
        }else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getArticleById = async(req, res) => {
    try {
        const articleId = req.params.articleId
        const artikel = await Artikel.findOne({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image'],
            where: {
                articleId: articleId
            }
        });
    
        if (!artikel) {
            res.status(404).json({
                message: "Article tidak ditemukan"
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data : artikel
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
        const artikel = await Artikel.findOne({
            attributes: ['articleId', 'title', 'category', 'date', 'writer', 'mainContent', 'image'],
            where: {
                category: category
            }
        });

        if (!artikel) {
            res.status(404).json({
                message: "Article tidak ditemukan"
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data : artikel
            });
        }
    } catch (error) {
        console.log(error)
    }

};

export const postArticle = async(req, res) => {
    const { articleId, title, category, date, writer, mainContent, image } = req.body;
    const artikel = new Artikel({
        articleId,
        title,
        category,
        date,
        writer,
        mainContent,
        image,
    });

    try {
        await artikel.save();
        res.status(201).json({
            message: "Article berhasil ditambahkan",
            artikel,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const updateArticle = async (req, res) => {
    const { articleId, title, category, date, writer, mainContent, image } = req.body;
    const artikel = await Artikel.findOne({
      where: {
        articleId: articleId
      }
    });
  
    if (!artikel) {
      res.status(404).json({
        message: "Article tidak ditemukan"
      });
      return;
    }
  
    artikel.title = title;
    artikel.category = category;
    artikel.date = date;
    artikel.writer = writer;
    artikel.mainContent = mainContent;
    artikel.image = image;
  
    await artikel.save();
  
    res.status(200).json({
      message: "Article berhasil diubah",
      artikel,
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
    const artikel = await Artikel.findOne({
      where: {
        articleId: articleId
      }
    });
  
    if (!artikel) {
      res.status(404).json({
        message: "Article tidak ditemukan"
      });
      return;
    }
  
    await artikel.destroy();
  
    res.status(200).json({
      message: "Article berhasil dihapus",
    });
  };

