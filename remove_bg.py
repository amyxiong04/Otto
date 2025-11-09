from PIL import Image
import os

# Open the image
img_path = 'public/images/otto.png'
img = Image.open(img_path).convert('RGBA')

# Get the image data
data = img.getdata()

# Create new image data
new_data = []
for item in data:
    # Check if pixel is part of the checkerboard pattern (light gray or white)
    # Checkerboard is typically (204, 204, 204) or (255, 255, 255)
    if item[0] > 200 and item[1] > 200 and item[2] > 200:
        # Make it transparent
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

# Update image data
img.putdata(new_data)

# Save the new image
img.save('public/images/otto_transparent.png', 'PNG')
print("✅ Created transparent version: public/images/otto_transparent.png")

# Replace the original
os.rename('public/images/otto.png', 'public/images/otto_original.png')
os.rename('public/images/otto_transparent.png', 'public/images/otto.png')
print("✅ Replaced original with transparent version")
