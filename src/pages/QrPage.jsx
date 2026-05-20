import JsBarcode from "jsbarcode";
import React, { useEffect, useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";

const FORMATS = ["png", "jpeg"];
const SIZES = ["S", "M", "L", "XL"];

export default function BarcodeLabel() {
  const [brandName, setBrandName] = useState("Sushant World");
  const [productName, setProductName] = useState("Product Name");
  const [size, setSize] = useState("M");
  const [colour, setColour] = useState("Black");
  const [price, setPrice] = useState("899");
  const [sku, setSku] = useState("ANAR-M-BLK");

  const [barcodeError, setBarcodeError] = useState(false);
  const [format, setFormat] = useState("png");
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const barcodeRef = useRef(null);
  const labelCardRef = useRef(null);

  useEffect(() => {
    if (!sku || !barcodeRef.current) return;

    try {
      JsBarcode(barcodeRef.current, sku, {
        format: "CODE128",
        lineColor: "#1e293b",
        background: "transparent",
        width: 2,
        height: 56,
        displayValue: true,
        fontSize: 11,
        margin: 4,
        fontOptions: "bold",
      });

      setBarcodeError(false);
    } catch {
      setBarcodeError(true);

      if (barcodeRef.current) {
        barcodeRef.current.innerHTML = "";
      }
    }
  }, [sku]);

  const downloadImage = async (type) => {
    try {
      setDownloading(true);

      let dataUrl;

      if (type === "png") {
        dataUrl = await toPng(labelCardRef.current, {
          pixelRatio: 2,
          cacheBust: true,
        });
      } else {
        dataUrl = await toJpeg(labelCardRef.current, {
          quality: 1,
          pixelRatio: 2,
          cacheBust: true,
        });
      }

      const link = document.createElement("a");

      link.download = `barcode-label.${type}`;
      link.href = dataUrl;
      link.click();

      setDownloaded(true);

      setTimeout(() => {
        setDownloaded(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownload = () => {
    downloadImage(format);
  };

  const disabled =
    barcodeError || !sku || downloading;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-green-50">
      <div className="mx-auto mb-20 w-full max-w-[840px] overflow-hidden md:rounded-[20px] bg-white shadow-[0_20px_60px_rgba(99,102,241,0.10),0_4px_16px_rgba(0,0,0,0.06)]">

        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-indigo-500 to-violet-500 px-7 py-5">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-white/20 text-[20px]">
            🏷️
          </div>

          <div>
            <h1 className="text-[17px] font-bold tracking-[-0.3px] text-white">
              Barcode Label Generator
            </h1>

            <p className="mt-[2px] text-[12px] text-white/75">
              Fill in details · preview live · export in any format
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row">

          {/* Form */}
          <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:basis-[52%] md:border-b-0 md:border-r">

            {/* Brand */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Brand Name
              </label>

              <input
                className="w-full rounded-[10px] border border-slate-200 bg-white px-4 py-[10px] text-[14px] outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                value={brandName}
                onChange={(e) =>
                  setBrandName(e.target.value)
                }
                placeholder="e.g. Nike"
              />
            </div>

            {/* Product */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Product Name
              </label>

              <input
                className="w-full rounded-[10px] border border-slate-200 bg-white px-4 py-[10px] text-[14px] outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                maxLength={20}
                placeholder="Classic Tee"
              />
            </div>

            {/* Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Size */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Size
                </label>

                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`flex-1 rounded-lg border px-1 py-2 text-[12px] font-semibold transition-all ${
                        size === s
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Colour
                </label>

                <input
                  className="w-full rounded-[10px] border border-slate-200 bg-white px-4 py-[10px] text-[14px] outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  value={colour}
                  onChange={(e) =>
                    setColour(e.target.value)
                  }
                  placeholder="Black"
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                  ₹
                </span>

                <input
                  className="w-full rounded-[10px] border border-slate-200 bg-white py-[10px] pl-8 pr-4 text-[14px] outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  value={price}
                  maxLength={5}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="899"
                />
              </div>
            </div>

            {/* SKU */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                SKU Code
              </label>

              <input
                className={`w-full rounded-[10px] border bg-white px-4 py-[10px] uppercase font-mono text-[14px] outline-none transition-all ${
                  barcodeError
                    ? "border-red-400 ring-4 ring-red-400/10"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                }`}
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                maxLength={13}
                placeholder="ANAR-M-BLK"
              />

              {barcodeError && (
                <p className="text-[12px] text-red-500">
                  ⚠ Invalid SKU
                </p>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-1 flex-col p-4 bg-slate-50 md:px-4">

            <div
              className="flex flex-col gap-4"
            >

              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Live Preview
              </p>

              {/* Label Card */}
              <div
                ref={labelCardRef}
                className="relative flex min-h-[180px] flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white p-4 shadow-sm"
              >

                <p className=" text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {brandName || "—"}
                </p>

                <div className=" flex items-start justify-between gap-3">
                  <p className="max-w-[60%] text-[15px] font-bold text-slate-800">
                    {productName || "—"}
                  </p>

                  <div className="text-[15px] font-bold">
                    {`Price: ₹${price || "0"}`}
                  </div>
                </div>

                <div className=" flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                    Size: {size}
                  </span>

                  <span className="text-slate-300">
                    •
                  </span>

                  <span className="text-[12px] text-slate-500">
                    {colour || "—"}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-center rounded-lg bg-slate-50">
                  {barcodeError ? (
                    <p className="text-[12px] italic text-red-400">
                      ⚠ Barcode unavailable
                    </p>
                  ) : (
                    <svg
                      ref={barcodeRef}
                      className="block w-full"
                    />
                  )}
                </div>
              </div>

              {/* Export */}
              <div className="flex flex-col gap-3">

                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Export Format
                </p>

                <div className="flex gap-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      className={`flex-1 rounded-[10px] border uppercase py-2 text-[12px] font-bold transition-all ${
                        format === f
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-slate-200 bg-white text-slate-500"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleDownload}
                  disabled={disabled}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all ${
                    downloaded
                      ? "bg-green-500"
                      : "bg-gradient-to-br from-indigo-500 to-violet-500"
                  } ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  {downloaded
                    ? "✓ Downloaded!"
                    : downloading
                    ? "⏳ Generating..."
                    : `⬇ Download as ${format}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}