
// 定义存放图片链接的数组
const imageGroups = {
  'mobile': [
 
  ],
  'tablet': [
 
  ],
  'pc': [
 
  ]
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 获取传入的 id 参数
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  // 如果存在 id 参数，选择对应图片组
  let selectedGroup;
  if (id && imageGroups[id]) {
    selectedGroup = imageGroups[id];
  } else {
    // 如果没有指定 id，则随机选择所有图片组中的一张图片
    const allImages = Object.values(imageGroups).flat();
    selectedGroup = allImages;
  }

  // 随机选择图片链接
  const randomImage = selectedGroup[Math.floor(Math.random() * selectedGroup.length)];

  // 获取图片内容
  const imageResponse = await fetch(randomImage);
  const imageContent = await imageResponse.arrayBuffer();

  // 设置 Content-Type
  const imageType = getImageType(randomImage);
  const contentType = imageType ? `image/${imageType}` : 'application/octet-stream';

  // 构建响应
  const headers = {
    'Content-Type': contentType,
    'Content-Length': imageContent.byteLength,
    'Accept-Ranges': 'bytes'
  };

  return new Response(imageContent, { headers });
}

function getImageType(url) {
  const extension = url.split('.').pop().toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg') {
    return 'jpeg';
  } else if (extension === 'png') {
    return 'png';
  } else if (extension === 'gif') {
    return 'gif';
  } else {
    return null;
  }
}
