const {check} = require(`express-validator`);

// const newCommentFormFieldsRules = [
//   check(`text`)
//     .trim()
//     .notEmpty()
//     .escape()
//     .withMessage(`Введите текст комментария`)
//     .bail()
//     .isLength({
//       min: 5,
//       max: 1000
//     })
//     .withMessage(`Текст комментария должен содержать от 5 до 1000 символов`)
// ];

const newProductsFormFieldsRules = [
  check(`name`)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`Enter product name`)
    .bail(),
  // check(`categories`, `Выберите минимум одну категорию для публикации`)
  //   .exists()
  //   .bail()
  //   .toArray()
  //   .isLength({min: 1}),
  check(`description`)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`Enter product description`)
    .bail()
    .isLength({
      min: 10
    })
    .withMessage(`Description must contain minimum 10 characters`),
  check(`brand`)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`Enter product brand`),
  check(`price`)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`Enter product price`),
  check(`countInStock`)
    .trim()
    .notEmpty()
    .escape()
    .withMessage(`Enter product stock`)
];

// const newCategoryFormFieldsRules = [
//   check(`title`)
//   .trim()
//     .notEmpty()
//     .withMessage(`Введите название категории`)
//     .bail()
//     .isLength({
//       min: 5,
//       max: 30
//     })
//     .withMessage(`Название категории должно содержать от 5 до 30 символов`)
//     .bail()
//     .custom(async (value) => {
//       const isCategoryExist = await categoryService.findOne(value);

//       if (isCategoryExist) {
//         throw Error(`Категория уже существует`);
//       }

//       return true;
//     })
// ];

// const newCommentFormFieldsRules = [
//   check(`text`)
//   .trim()
//     .notEmpty()
//     .withMessage(`Введите текст комментария`)
//     .escape()
//     .bail()
//     .isLength({
//       min: 20
//     })
//     .withMessage(`Текст комментария должен содержать минимум 20 символов`)
// ];

const registrationFormFieldsRules = [
  check(`email`)
    .trim()
    .notEmpty()
    .withMessage(`Enter email`)
    .bail()
    .isEmail()
    .withMessage(`Invalid email`),
  check(`firstname`)
    .trim()
    .notEmpty()
    .withMessage(`Enter fistname`)
    .bail()
    .custom((value) => {
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Firstname must contain letters only`),
  check(`lastname`)
    .trim()
    .notEmpty()
    .withMessage(`Enter lastname`)
    .bail()
    .custom((value) => {
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Lastname must contain letters only`),
  check(`password`)
    .trim()
    .notEmpty()
    .withMessage(`Enter password`)
    .bail()
    .isLength({min: 6})
    .withMessage(`Password must contain 6 symbols`),
  check(`confirmPassword`)
    .trim()
    .notEmpty()
    .withMessage(`Confirm password`)
    .bail()
    .isLength({min: 6})
    .withMessage(`Password must contain 6 symbols`)
    .bail()
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw Error(`Passwords don't match`);
      }
      return true;
    })
];

const updateUserFormFieldsRules = [
  check(`email`)
    .trim()
    .notEmpty()
    .withMessage(`Enter email`)
    .bail()
    .isEmail()
    .withMessage(`Invalid email`),
  check(`firstname`)
    .trim()
    .notEmpty()
    .withMessage(`Enter fistname`)
    .bail()
    .custom((value) => {
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Firstname must contain letters only`),
  check(`lastname`)
    .trim()
    .notEmpty()
    .withMessage(`Enter lastname`)
    .bail()
    .custom((value) => {
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Lastname must contain letters only`),
  check(`password`)
    .optional()
    .trim()
    .notEmpty()
    .withMessage(`Enter password`)
    .bail()
    .isLength({min: 6})
    .withMessage(`Password must contain 6 symbols`),
  check(`confirmPassword`)
    .optional()
    .trim()
    .notEmpty()
    .withMessage(`Confirm password`)
    .bail()
    .isLength({min: 6})
    .withMessage(`Password must contain 6 symbols`)
    .bail()
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw Error(`Passwords don't match`);
      }
      return true;
    }),
  check("city")
    .custom((value) => {
      if(!value) return true;
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`City must contain letters only`),
  check("postalCode")
    .custom((value) => {
      if(!value) return true;
      const nameRegExp = /^\d+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Postal code must contain numbers only`),
  check("country")
    .custom((value) => {
      if(!value) return true;
      const nameRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;
      return nameRegExp.test(value);
    })
    .withMessage(`Country must contain letters only`),
];

const loginFormFieldsRules = [
  check(`email`)
    .trim()
    .notEmpty()
    .withMessage(`Enter email`)
    .bail()
    .isEmail()
    .withMessage(`Invalid email`),
  check(`password`)
    .trim()
    .notEmpty()
    .withMessage(`Enter password`)
    .bail()
    .isLength({min: 6})
    .withMessage(`Password must contain 6 symbols`)
];

module.exports = {
  // newCommentFormFieldsRules,
  registrationFormFieldsRules,
  loginFormFieldsRules,
  updateUserFormFieldsRules,
  newProductsFormFieldsRules
  // newPostFormFieldsRules
};
