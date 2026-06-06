import os
from PIL import Image

def generate_assets():
    logo_path = r"d:\Kyoshi\Dosyalar\VIZJA\3 mobile prog\RoamLite\assets\images\RoamLiteLogo.png"
    assets_dir = r"d:\Kyoshi\Dosyalar\VIZJA\3 mobile prog\RoamLite\assets\images"
    
    if not os.path.exists(logo_path):
        print(f"Error: Logo file not found at {logo_path}")
        return

    print("Loading logo...")
    img = Image.open(logo_path).convert("RGBA")
    w, h = img.size
    print(f"Original logo size: {w}x{h}")

    # Analyze corner color
    corner_pixel = img.getpixel((0, 0))
    r, g, b, a = corner_pixel
    print(f"Corner pixel (0,0) RGBA: {corner_pixel}")
    
    # Check if corner is transparent or solid
    is_transparent = (a == 0)
    bg_hex = f"#{r:02x}{g:02x}{b:02x}"
    print(f"Is background transparent? {is_transparent}")
    print(f"Detected background hex color: {bg_hex}")

    # 1. Generate icon.png (1024x1024)
    print("Generating icon.png (1024x1024)...")
    icon_img = img.resize((1024, 1024), Image.Resampling.LANCZOS)
    icon_img.save(os.path.join(assets_dir, "icon.png"), "PNG")

    # 2. Generate favicon.png (48x48)
    print("Generating favicon.png (48x48)...")
    favicon_img = img.resize((48, 48), Image.Resampling.LANCZOS)
    favicon_img.save(os.path.join(assets_dir, "favicon.png"), "PNG")

    # 3. Generate splash-icon.png (e.g. 1024x1024, or standard splash size)
    # The splash icon is centered on the splash screen by Expo.
    # We use the transparent foreground logo so it floats nicely on any background.
    print("Generating splash-icon.png...")
    # Generate transparent foreground if not done already
    logo_fg = img.copy()
    if not is_transparent:
        print("Logo has solid background. Creating transparent foreground for splash screen...")
        data = logo_fg.getdata()
        new_data = []
        for item in data:
            dist = sum((item[i] - corner_pixel[i]) ** 2 for i in range(3)) ** 0.5
            if dist < 30: # tolerance
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
        logo_fg.putdata(new_data)
        
    splash_icon_img = logo_fg.resize((1024, 1024), Image.Resampling.LANCZOS)
    splash_icon_img.save(os.path.join(assets_dir, "splash-icon.png"), "PNG")

    # 4. Generate adaptive foreground icon
    # For Android adaptive icons, the foreground must be inside a 66% safe zone
    # and have a transparent background. Let's create a transparent 1024x1024 canvas
    # and paste a scaled-down version of the logo in the center (e.g., 600x600)
    # so it does not get cut off by circular/squircle masks on Android.
    print("Generating android-icon-foreground.png...")
    fg_canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    fg_size = 640
    # If the background of the original logo is not transparent, let's make it transparent for the foreground
    logo_fg = img.copy()
    if not is_transparent:
        print("Logo has solid background. Creating transparent foreground image for Android adaptive icon...")
        # Simple color keying: replace corner background color with transparent pixels
        # (with a tolerance of 15 to handle compression artifacts if any)
        data = logo_fg.getdata()
        new_data = []
        for item in data:
            # check distance to corner color
            dist = sum((item[i] - corner_pixel[i]) ** 2 for i in range(3)) ** 0.5
            if dist < 30: # tolerance
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
        logo_fg.putdata(new_data)

    logo_fg_resized = logo_fg.resize((fg_size, fg_size), Image.Resampling.LANCZOS)
    paste_pos = ((1024 - fg_size) // 2, (1024 - fg_size) // 2)
    fg_canvas.paste(logo_fg_resized, paste_pos, logo_fg_resized)
    fg_canvas.save(os.path.join(assets_dir, "android-icon-foreground.png"), "PNG")

    # 5. Generate android-icon-background.png (solid background)
    print("Generating android-icon-background.png...")
    bg_color = (r, g, b, 255) if not is_transparent else (21, 23, 24, 255) # default to dark theme background if transparent
    bg_canvas = Image.new("RGBA", (1024, 1024), bg_color)
    bg_canvas.save(os.path.join(assets_dir, "android-icon-background.png"), "PNG")

    # 6. Generate monochrome icon (for themed icons)
    print("Generating android-icon-monochrome.png...")
    # Make a monochrome version (black/white/alpha)
    monochrome = logo_fg.convert("L").convert("RGBA")
    # Set monochrome to white on transparent
    mono_data = monochrome.getdata()
    new_mono_data = []
    for item in mono_data:
        # If not transparent, make it white (255, 255, 255, alpha)
        if item[3] > 0:
            new_mono_data.append((255, 255, 255, item[3]))
        else:
            new_mono_data.append((0, 0, 0, 0))
    monochrome.putdata(new_mono_data)
    mono_resized = monochrome.resize((fg_size, fg_size), Image.Resampling.LANCZOS)
    mono_canvas = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    mono_canvas.paste(mono_resized, paste_pos, mono_resized)
    mono_canvas.save(os.path.join(assets_dir, "android-icon-monochrome.png"), "PNG")

    print("All assets generated successfully!")

if __name__ == "__main__":
    generate_assets()
