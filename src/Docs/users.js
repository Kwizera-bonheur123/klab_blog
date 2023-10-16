// Get all Users
/**
 * @swagger
 * /api/user/selectUsers:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of posts
 *         schema:
 *           type: array
 *       500:
 *         description: Internal server error
 */

// Get all blogs
/**
 * @swagger
 * /api/blog/select:
 *   get:
 *     tags:
 *       - Blog
 *     description: Returns all Blogs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of posts
 *         schema:
 *           type: array
 *       500:
 *         description: Internal server error
 */

// Delete blog by Id

/**
 * @swagger
 * /api/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Blog ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "Blog post deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bogImage:
 *                       type: string
 *                       example: http://example.com/blog_image.jpg
 *                     blogTitle:
 *                       type: string
 *                       example: "Title of the Blog"
 *                     blogContent:
 *                       type: string
 *                       example: "Content of the blog post"
 *       404:
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "Blog post not found"
 */


/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user with profile picture
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: First name of the user
 *               lastname:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture (optional)
 *           required:
 *             - firstname
 *             - lastname
 *             - email
 *             - password
 *             - profile
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User Login in 
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *           required:
 *             - email
 *             - password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404: 
 *          description: incorrect credentials
 */


/**
 * @swagger
 * /api/blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Updated blog data
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             subheader:
 *               type: string
 *             content:
 *               type: string
 *             blogImage:
 *               type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */



/**
 * @swagger
 * /api/blog/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Updated blog data
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             subheader:
 *               type: string
 *             content:
 *               type: string
 *             blogImage:
 *               type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */




/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Operations related to blogs
 */

/**
 * @swagger
 * /api/blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subheader:
 *                 type: string
 *               content:
 *                 type: string
 *               blogImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       500:
 *         description: Failed to create a blog
 */



/**
 * @swagger
 * /api/blog/comment/:id:
 *   put:
 *     tags:
 *       - Blog
 *     summary: This end point help to add comment to created blog 
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: comment added to blog
 *           required:
 *             - comment
 *     responses:
 *       200:
 *         description: comment added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       404: 
 *          description: Blog not found
 */
