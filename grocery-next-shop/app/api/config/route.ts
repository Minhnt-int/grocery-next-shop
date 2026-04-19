import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "data", "site.config.json");

export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(data);
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error reading config:", error);
    return NextResponse.json({ error: "Failed to read config" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Read current config
    const currentData = await fs.readFile(CONFIG_PATH, "utf-8");
    const currentConfig = JSON.parse(currentData);

    // Merge with new data
    const updatedConfig = {
      ...currentConfig,
      shopName: body.shopName || currentConfig.shopName,
      tagline: body.tagline || currentConfig.tagline,
      supportPhone: body.supportPhone || currentConfig.supportPhone,
      email: body.email || currentConfig.email,
      address: body.address || currentConfig.address,
      vietqrBin: body.vietqrBin || currentConfig.vietqrBin,
      vietqrAccount: body.vietqrAccount || currentConfig.vietqrAccount,
      vietqrAccountName: body.vietqrAccountName || currentConfig.vietqrAccountName,
      vietqrTemplate: body.vietqrTemplate || currentConfig.vietqrTemplate,
      metaTitle: body.metaTitle || currentConfig.metaTitle,
      metaDesc: body.metaDesc || currentConfig.metaDesc,
      metaKeywords: body.metaKeywords || currentConfig.metaKeywords,
    };

    // Write back to file
    await fs.writeFile(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2), "utf-8");

    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error) {
    console.error("Error saving config:", error);
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }
}
