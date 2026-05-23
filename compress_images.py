# 批量压缩图片脚本
# 需要安装 Pillow: pip install Pillow

from PIL import Image
import os

# 图片目录
image_dir = "./images"

# 遍历所有图片
for filename in os.listdir(image_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        filepath = os.path.join(image_dir, filename)
        
        # 跳过无效文件（0字节）
        if os.path.getsize(filepath) == 0:
            print(f"跳过 (空文件): {filename}")
            continue
            
        try:
            with Image.open(filepath) as img:
                # 如果图片太大，先缩小尺寸
                max_size = (800, 600)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # 保存为JPEG，质量65%（更激进压缩）
                if filename.lower().endswith('.png'):
                    # PNG转JPG
                    output_path = filepath.replace('.png', '.jpg').replace('.PNG', '.jpg')
                    img = img.convert('RGB')
                    img.save(output_path, 'JPEG', quality=65, optimize=True)
                    # 删除原PNG
                    os.remove(filepath)
                else:
                    output_path = filepath
                    img.save(output_path, 'JPEG', quality=65, optimize=True)
                
                # 获取新文件大小
                new_size = os.path.getsize(output_path) / 1024
                print(f"✓ {filename} -> {new_size:.1f}KB")
        except Exception as e:
            print(f"跳过 (错误): {filename} - {e}")

print("\n压缩完成！所有图片已保存为JPEG格式")
