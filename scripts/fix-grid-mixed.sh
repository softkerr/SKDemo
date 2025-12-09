#!/bin/bash

# Fix Grid elements with mixed size={{ xs: }} sm={} md={} syntax

echo "🔧 Fixing mixed Grid syntax..."

# Find files with the mixed pattern
files=$(find src -name "*.tsx" -type f -exec grep -l "size={{ xs:" {} \; | xargs grep -l " sm={\|md={\|lg={")

for file in $files; do
  echo "Processing: $file"
  
  # Fix size={{ xs: 12 }} sm={6} md={3} -> size={{ xs: 12, sm: 6, md: 3 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} sm=\{(\d+)\} md=\{(\d+)\}/size={{ xs: $1, sm: $2, md: $3 }}/g' "$file"
  
  # Fix size={{ xs: 12 }} md={6} -> size={{ xs: 12, md: 6 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} md=\{(\d+)\}/size={{ xs: $1, md: $2 }}/g' "$file"
  
  # Fix size={{ xs: 12 }} sm={6} -> size={{ xs: 12, sm: 6 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} sm=\{(\d+)\}/size={{ xs: $1, sm: $2 }}/g' "$file"
  
  # Fix size={{ xs: 12 }} lg={8} -> size={{ xs: 12, lg: 8 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} lg=\{(\d+)\}/size={{ xs: $1, lg: $2 }}/g' "$file"
  
  # Fix size={{ xs: 6 }} md={3} -> size={{ xs: 6, md: 3 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} md=\{(\d+)\}/size={{ xs: $1, md: $2 }}/g' "$file"
  
  # Fix size={{ xs: 12 }} sm={6} md={4} -> size={{ xs: 12, sm: 6, md: 4 }}
  perl -i -pe 's/size=\{\{ xs: (\d+) \}\} sm=\{(\d+)\} md=\{(\d+)\}/size={{ xs: $1, sm: $2, md: $3 }}/g' "$file"
done

echo "✅ Mixed Grid syntax fixed!"
