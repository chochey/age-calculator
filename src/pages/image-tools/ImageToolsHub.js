import CategoryHub from '../../components/CategoryHub';

const tools = [
  { name: 'Image Resizer', description: 'Resize images to custom dimensions. PNG, JPG & WebP.', path: '/image-resizer' },
  { name: 'Image Compressor', description: 'Reduce image file size with adjustable quality.', path: '/image-compressor' },
];

const faqs = [
  { q: 'Are my images uploaded to a server?', a: 'No. Both the resizer and compressor run entirely in your browser using the Canvas API and client-side JavaScript. Your images never leave your device, so there is nothing to intercept, store, or delete on our end.' },
  { q: 'What image formats are supported?', a: 'You can load PNG, JPG, and WebP files into either tool. When saving, you choose the output format and quality level, so you can convert between formats at the same time -- for example, drop in a PNG and export a smaller WebP.' },
  { q: 'Is there a file size or resolution limit?', a: 'There is no hard limit set by our tools. The practical ceiling depends on your browser and available memory. Most modern browsers handle images up to around 16,000 pixels on a side without issues, which covers virtually every photo or design asset.' },
];

function ImageToolsHub() {
  return (
    <CategoryHub
      title="Free Online Image Tools - Resize & Compress Images"
      description="Free browser-based image tools. Resize images to any dimensions and compress file sizes without uploading to a server. Supports PNG, JPG, and WebP."
      intro="Free browser-based tools to resize and compress images without uploading to a server."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Free Image Tools</h2>
        <p>
          Every image tool on this page processes your files entirely inside your web browser. When you
          drop an image into the resizer or compressor, the pixels are decoded locally using the HTML
          Canvas API and JavaScript -- nothing is sent over the network, and no server ever touches your
          files. That means your photos, screenshots, and design assets stay private by default. There
          is no upload queue, no waiting for a remote server to finish, and no daily usage cap. Because
          the work happens on your own device, results appear almost instantly for typical web-sized
          images. Whether you need to scale down a hero banner for a blog post or trim a few hundred
          kilobytes from a product photo before emailing it, you can do it in seconds without creating
          an account, installing software, or trusting a third-party cloud service with your data.
        </p>

        <h2>Supported Formats and Quality</h2>
        <p>
          Both tools accept the three most common web image formats -- PNG, JPG, and WebP. PNG is
          ideal when you need lossless quality and transparency support, making it the go-to choice for
          logos, icons, and screenshots. JPG uses lossy compression that excels at photographs and
          complex scenes where a small quality trade-off yields dramatically smaller files. WebP, the
          modern format developed by Google, offers both lossy and lossless modes and typically produces
          files 25 to 35 percent smaller than equivalent JPGs at comparable visual quality. When you
          export from either tool, you can pick your target format independently of the input format,
          effectively converting between types on the fly. The compressor also lets you drag a quality
          slider so you can preview the file-size-versus-clarity trade-off in real time before
          downloading. This flexibility makes it easy to optimize images for websites, email, social
          media, or any situation where bandwidth and load speed matter.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Are my images uploaded to a server?</h3>
        <p>
          No. Both the resizer and compressor run entirely in your browser using the Canvas API and
          client-side JavaScript. Your images never leave your device, so there is nothing to
          intercept, store, or delete on our end.
        </p>

        <h3>What image formats are supported?</h3>
        <p>
          You can load PNG, JPG, and WebP files into either tool. When saving, you choose the output
          format and quality level, so you can convert between formats at the same time -- for example,
          drop in a PNG and export a smaller WebP.
        </p>

        <h3>Is there a file size or resolution limit?</h3>
        <p>
          There is no hard limit set by our tools. The practical ceiling depends on your browser and
          available memory. Most modern browsers handle images up to around 16,000 pixels on a side
          without issues, which covers virtually every photo or design asset.
        </p>
      </section>
    </CategoryHub>
  );
}

export default ImageToolsHub;
