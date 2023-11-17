const fs = require('fs');
const path = require('path');
const axios = require('axios');

const imageDirectory = './images';

const validExtensions = ['.png', '.jpg', '.jpeg'];

exports.saveImage = async (message) => {
  if (message.attachments.size === 0) {
    return message.reply('Please attach an image to your message.');
  }

  const attachment = message.attachments.first();
  const attachmentURL = attachment.url;

  const fileExtension = path.extname(attachmentURL).split('?')[0].toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    return message.reply(
      'Invalid file format. Please upload an image with a valid extension (.png, .jpg, .jpeg).',
    );
  }

  if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory);
  }

  const fileName = `image_${Date.now()}_${path.basename(attachmentURL).split('?')[0]}`;
  const filePath = path.join(__dirname, imageDirectory, fileName);

  const imageStream = fs.createWriteStream(filePath);
  const response = await axios.get(attachmentURL, { responseType: 'stream' });
  response.data.pipe(imageStream);

  imageStream.on('finish', () => {
    message.reply(`Image uploaded and saved as: ${fileName}`);
  });
};

exports.sendImage = (message) => {
  fs.readdir(path.join(__dirname, imageDirectory), (err, files) => {
    if (err) {
      return console.error('Error reading image directory:', err);
    }

    const validImageFiles = files.filter((file) =>
      validExtensions.includes(path.extname(file).toLowerCase()),
    );

    if (validImageFiles.length === 0) {
      return message.reply('No images saved.');
    }

    const randomFileName = validImageFiles[Math.floor(Math.random() * validImageFiles.length)];
    const imagePath = path.join(imageDirectory, randomFileName);

    message.channel.send({
      content: `This is your random Chunbae! File name:${randomFileName}`,
      files: [imagePath],
    });
  });
};

exports.listImage = (message, pageNumber = 1) => {
  const pageSize = 20;

  fs.readdir(path.join(__dirname, imageDirectory), (err, files) => {
    if (err) {
      return console.error('Error reading image directory:', err);
    }

    const validImageFiles = files.filter((file) =>
      validExtensions.includes(path.extname(file).toLowerCase()),
    );

    const totalPages = Math.ceil(validImageFiles.length / pageSize);

    if (!pageNumber || pageNumber < 1 || pageNumber > totalPages) {
      return message.reply(
        `Invalid page number. Please provide a number between 1 and ${totalPages}.`,
      );
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageFiles = validImageFiles.slice(startIndex, endIndex);

    const listMessage = `**Image List (Page ${pageNumber}/${totalPages}):**\n${
      pageFiles.join('\n') || 'No images.'
    }`;

    message.channel.send(listMessage);
  });
};

exports.removeImage = (message, fileName) => {
  if (!fileName) {
    return message.reply('Please provide the exact filename of the image you want to remove.');
  }
  const targetFilePath = path.join(__dirname, imageDirectory, fileName);

  if (fs.existsSync(targetFilePath)) {
    fs.unlinkSync(targetFilePath);
    message.reply(`Image \`${fileName}\` has been removed.`);
  } else {
    message.reply(`No image found with the filename \`${fileName}\`.`);
  }
};
