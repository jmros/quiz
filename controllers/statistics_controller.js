var models = require('../models/models.js');

var statistics = {
  preguntas: 0,
  comentarios: 0,
  comentariosSinPublicar:0,
  preguntasComentadas:0
  };

  var errors = [];

  exports.calculate = function (req, res, next) {

  models.Quiz.count()
  .then(function (numPreguntas) { // número de preguntas
    statistics.preguntas = numPreguntas;
    return models.Comment.count();
  })
  .then(function (numComentarios) { // número de comentarios
    statistics.comentarios = numComentarios;
    return models.Comment.contarNoPublicados();
  })
  .then(function (numComentariosNoPublicados) { // número de comentarios no publicados
    statistics.comentariosSinPublicar = numComentariosNoPublicados;
    return models.Comment.contarPreguntasComentadas();
  })
  .then(function (numPreguntasConComentario) { // número de preguntas comentadas
    statistics.preguntasComentadas = numPreguntasConComentario;
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    next();
  });

};
  // GET /quizes/statistics
  exports.show = function(req,res){
    res.render('quizes/statistics', { statistics: statistics, errors: errors });
  };
