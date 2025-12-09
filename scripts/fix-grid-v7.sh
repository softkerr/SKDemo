#!/bin/bash

# Script to fix MUI Grid v7 deprecated props
# Replaces item/container props with size prop

echo "🔧 Fixing MUI Grid v7 deprecated props..."

# Find all .tsx files with Grid usage
files=$(find src -name "*.tsx" -type f -exec grep -l "Grid.*item" {} \;)

for file in $files; do
  echo "Processing: $file"
  
  # Replace common patterns
  # Grid item xs={12} -> Grid size={{ xs: 12 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)}/<Grid size={{ xs: \1 }}/g' "$file"
  
  # Grid item xs={12} sm={6} -> Grid size={{ xs: 12, sm: 6 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} sm={\([0-9]*\)}/<Grid size={{ xs: \1, sm: \2 }}/g' "$file"
  
  # Grid item xs={12} md={6} -> Grid size={{ xs: 12, md: 6 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} md={\([0-9]*\)}/<Grid size={{ xs: \1, md: \2 }}/g' "$file"
  
  # Grid item xs={12} sm={6} md={4} -> Grid size={{ xs: 12, sm: 6, md: 4 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} sm={\([0-9]*\)} md={\([0-9]*\)}/<Grid size={{ xs: \1, sm: \2, md: \3 }}/g' "$file"
  
  # Grid item xs={12} sm={6} md={3} lg={2} -> Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} sm={\([0-9]*\)} md={\([0-9]*\)} lg={\([0-9]*\)}/<Grid size={{ xs: \1, sm: \2, md: \3, lg: \4 }}/g' "$file"
  
  # Grid item md={3} -> Grid size={{ md: 3 }}
  sed -i '' 's/<Grid item md={\([0-9]*\)}/<Grid size={{ md: \1 }}/g' "$file"
  
  # Grid item sm={6} -> Grid size={{ sm: 6 }}
  sed -i '' 's/<Grid item sm={\([0-9]*\)}/<Grid size={{ sm: \1 }}/g' "$file"
  
  # Grid item lg={4} -> Grid size={{ lg: 4 }}
  sed -i '' 's/<Grid item lg={\([0-9]*\)}/<Grid size={{ lg: \1 }}/g' "$file"
  
  # Grid item xs={12} sm={6} md={4} lg={3} -> Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} sm={\([0-9]*\)} md={\([0-9]*\)} lg={\([0-9]*\)}/<Grid size={{ xs: \1, sm: \2, md: \3, lg: \4 }}/g' "$file"
  
  # Grid item xs={12} md={6} lg={4} -> Grid size={{ xs: 12, md: 6, lg: 4 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} md={\([0-9]*\)} lg={\([0-9]*\)}/<Grid size={{ xs: \1, md: \2, lg: \3 }}/g' "$file"
  
  # Grid item xs={12} lg={8} -> Grid size={{ xs: 12, lg: 8 }}
  sed -i '' 's/<Grid item xs={\([0-9]*\)} lg={\([0-9]*\)}/<Grid size={{ xs: \1, lg: \2 }}/g' "$file"
  
  # Handle order prop - needs to be inside size object
  sed -i '' 's/size={{ \(.*\) }} order={{ \(.*\) }}/size={{ \1, order: { \2 } }}/g' "$file"
done

echo "✅ Grid v7 migration complete!"
echo "📝 Files processed: $(echo "$files" | wc -l | tr -d ' ')"
