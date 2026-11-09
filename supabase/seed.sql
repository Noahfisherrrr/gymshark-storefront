-- ============================================================
-- GYMSHARK APP - SUPABASE SEED DATA (PRODUCTION READY)
-- 100 Products (40 Women, 40 Men, 20 Accessories)
-- Includes Variants, Reviews, and Sample Discount Codes
-- ============================================================

-- 1. CLEANUP (Safe delete of dependent rows to prevent constraint collisions from prior runs)
DELETE FROM public.reviews;
DELETE FROM public.comments;
DELETE FROM public.product_variants;

-- 2. DISCOUNT CODES
INSERT INTO public.discount_codes (code, description, amount_off, is_active, expires_at) VALUES
('WELCOME10', 'Welcome 10% discount for first order', 0.10, true, NULL),
('GYMSHARK15', 'Athlete exclusive 15% discount', 0.15, true, NULL),
('SUMMER20', 'Seasonal 20% off summer collection', 0.20, true, NULL)
ON CONFLICT (code) DO NOTHING;

-- 2. PRODUCTS
INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES
(
  'gymshark-softsense-longline-sports-bra-cherry-red', 'gymshark-softsense-longline-sports-bra-cherry-red', 'Gymshark SoftSense™ Longline Sports Bra', 'Medium Support',
  'women', 'f', 'sports-bras', ARRAY['yoga', 'pilates', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', NULL, ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'softsense', 'SoftSense™', 42, NULL,
  '/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp', 'Trending', ARRAY['NEW RELEASE', 'SOFTSENSE™']::text[], 'Cherry Red', '#8B1E2E',
  '[{"name":"Cherry Red","hex":"#8B1E2E","slug":"gymshark-softsense-longline-sports-bra-cherry-red","image":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"gymshark-softsense-longline-sports-bra-cherry-red-black","image":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"gymshark-softsense-longline-sports-bra-cherry-red-grey","image":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","fallback":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","alt":"Gymshark SoftSense™ Longline Sports Bra front view"},{"type":"image","url":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","fallback":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","alt":"Gymshark SoftSense™ Longline Sports Bra side profile view"},{"type":"image","url":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","fallback":"/media/products/catalog/gymshark-softsense-longline-sports-bra-cherry-red.webp","alt":"Gymshark SoftSense™ Longline Sports Bra back fabric detail"}]'::jsonb, 'Softness you can genuinely sense. The SoftSense™ Longline Sports Bra is engineered with revolutionary LYCRA® ADAPTIV fiber that personalizes its hold to your unique shape. Designed with an extended underbust band for confident coverage during studio sessions and all-day athleisure comfort.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Medium Support"}'::jsonb,
  4.5, 45, '{"1":1,"2":1,"3":1,"4":7,"5":35}'::jsonb, '{}'::text[]
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'Vital Seamless 2.0 High-Waisted Leggings', 'Full Length (28" Inseam)',
  'women', 'f', 'leggings', ARRAY['weight-lifting', 'running', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Vital Seamless', 54, NULL,
  '/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp', 'Bestseller', ARRAY['ICONIC', 'SQUAT-PROOF']::text[], 'Black Marl', '#222225',
  '[{"name":"Black Marl","hex":"#222225","slug":"vital-seamless-2-0-high-waisted-leggings-black-marl","image":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"vital-seamless-2-0-high-waisted-leggings-black-marl-black","image":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"vital-seamless-2-0-high-waisted-leggings-black-marl-grey","image":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","fallback":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","alt":"Vital Seamless 2.0 High-Waisted Leggings front view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","fallback":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","alt":"Vital Seamless 2.0 High-Waisted Leggings side profile view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","fallback":"/media/products/catalog/vital-seamless-2-0-high-waisted-leggings-black-marl.webp","alt":"Vital Seamless 2.0 High-Waisted Leggings back fabric detail"}]'::jsonb, 'The legend that built Gymshark. Vital Seamless 2.0 Leggings are crafted with sweat-wicking tech and compressive marl knit to support your heavy compound lifts and high-mileage runs with complete zero-distraction squat-proof security.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Full Length (28\" Inseam)"}'::jsonb,
  4.7, 64, '{"1":1,"2":1,"3":2,"4":10,"5":49}'::jsonb, '{}'::text[]
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'Everyday Seamless Short Sleeve Crop Top', 'Breathable Contour Knit',
  'women', 'f', 't-shirts', ARRAY['pilates', 'athleisure', 'yoga']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'everyday-seamless', 'Everyday Seamless', 38, NULL,
  '/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp', 'New', ARRAY['BESTSELLER', 'SEAMLESS']::text[], 'Sage Green', '#7D9D8B',
  '[{"name":"Sage Green","hex":"#7D9D8B","slug":"everyday-seamless-short-sleeve-crop-top-sage-green","image":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"everyday-seamless-short-sleeve-crop-top-sage-green-black","image":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"everyday-seamless-short-sleeve-crop-top-sage-green-grey","image":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","fallback":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","alt":"Everyday Seamless Short Sleeve Crop Top front view"},{"type":"image","url":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","fallback":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","alt":"Everyday Seamless Short Sleeve Crop Top side profile view"},{"type":"image","url":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","fallback":"/media/products/catalog/everyday-seamless-short-sleeve-crop-top-sage-green.webp","alt":"Everyday Seamless Short Sleeve Crop Top back fabric detail"}]'::jsonb, 'Effortless minimalism meets gym-ready performance. The Everyday Seamless Crop Top features targeted micro-mesh ribbing for cooling airflow, a flattering round crew neckline, and unrestrictive four-way stretch.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Breathable Contour Knit"}'::jsonb,
  4.9, 83, '{"1":1,"2":1,"3":3,"4":13,"5":64}'::jsonb, '{}'::text[]
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'Power Cropped Full-Zip Fleece Hoodie', 'Heavyweight Lifting Layer',
  'women', 'f', 'hoodies', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 5''8" (173cm) wearing size S in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 58, 68,
  '/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp', 'Sale', ARRAY['HEAVYWEIGHT', 'PUMP COVER']::text[], 'Washed Black', '#333333',
  '[{"name":"Washed Black","hex":"#333333","slug":"power-cropped-full-zip-fleece-hoodie-washed-black","image":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"power-cropped-full-zip-fleece-hoodie-washed-black-black","image":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"power-cropped-full-zip-fleece-hoodie-washed-black-grey","image":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","fallback":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","alt":"Power Cropped Full-Zip Fleece Hoodie front view"},{"type":"image","url":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","fallback":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","alt":"Power Cropped Full-Zip Fleece Hoodie side profile view"},{"type":"image","url":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","fallback":"/media/products/catalog/power-cropped-full-zip-fleece-hoodie-washed-black.webp","alt":"Power Cropped Full-Zip Fleece Hoodie back fabric detail"}]'::jsonb, 'Your ultimate squat-rack warm-up companion. Heavyweight 380gsm brushed loopback cotton fleece with a boxy cropped silhouette, chunky industrial zipper, and double-lined hood for cold morning gym sessions.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Heavyweight Lifting Layer"}'::jsonb,
  4.6, 102, '{"1":1,"2":1,"3":4,"4":16,"5":79}'::jsonb, '{}'::text[]
),
(
  'adapt-camo-seamless-5-shorts-berry-pink', 'adapt-camo-seamless-5-shorts-berry-pink', 'Adapt Camo Seamless 5" Shorts', 'High Support Lifting Shorts',
  'women', 'f', 'shorts', ARRAY['weight-lifting', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Adapt Seamless', 46, NULL,
  '/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp', 'Trending', ARRAY['CAMO JACQUARD', 'SQUAT-PROOF']::text[], 'Berry Pink', '#A23B72',
  '[{"name":"Berry Pink","hex":"#A23B72","slug":"adapt-camo-seamless-5-shorts-berry-pink","image":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"adapt-camo-seamless-5-shorts-berry-pink-black","image":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"adapt-camo-seamless-5-shorts-berry-pink-grey","image":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","fallback":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","alt":"Adapt Camo Seamless 5\" Shorts front view"},{"type":"image","url":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","fallback":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","alt":"Adapt Camo Seamless 5\" Shorts side profile view"},{"type":"image","url":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","fallback":"/media/products/catalog/adapt-camo-seamless-5-shorts-berry-pink.webp","alt":"Adapt Camo Seamless 5\" Shorts back fabric detail"}]'::jsonb, 'Engineered for PRs. Featuring a custom jacquard camo weave, compressive ribbed waistband that holds without digging in, and subtle scrunch contour detailing that highlights your glute shape.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"High Support Lifting Shorts"}'::jsonb,
  4.8, 121, '{"1":1,"2":1,"3":4,"4":19,"5":94}'::jsonb, '{}'::text[]
),
(
  'geo-seamless-high-waisted-leggings-slate-blue', 'geo-seamless-high-waisted-leggings-slate-blue', 'Geo Seamless High-Waisted Leggings', 'Architectural Rib Knit',
  'women', 'f', 'leggings', ARRAY['running', 'pilates', 'weight-lifting']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch', 'sweat-wicking']::text[],
  'geo-seamless', 'Geo Seamless', 56, NULL,
  '/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp', 'New', ARRAY['ENGINEERED RIB', 'HIGH SUPPORT']::text[], 'Slate Blue', '#4A6572',
  '[{"name":"Slate Blue","hex":"#4A6572","slug":"geo-seamless-high-waisted-leggings-slate-blue","image":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"geo-seamless-high-waisted-leggings-slate-blue-black","image":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"geo-seamless-high-waisted-leggings-slate-blue-grey","image":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","fallback":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","alt":"Geo Seamless High-Waisted Leggings front view"},{"type":"image","url":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","fallback":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","alt":"Geo Seamless High-Waisted Leggings side profile view"},{"type":"image","url":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","fallback":"/media/products/catalog/geo-seamless-high-waisted-leggings-slate-blue.webp","alt":"Geo Seamless High-Waisted Leggings back fabric detail"}]'::jsonb, 'Precision contouring meets high-gauge seamless jacquard. Geometric shading accentuates quadriceps and calves while the supportive compression band stays pinned in place during explosive plyometrics.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Architectural Rib Knit"}'::jsonb,
  4.5, 140, '{"1":1,"2":1,"3":5,"4":22,"5":109}'::jsonb, '{}'::text[]
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'GS Power Heavyweight Oversized T-Shirt', 'Drop-Shoulder Boxy Tee',
  'women', 'f', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 5''8" (173cm) wearing size S in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 36, NULL,
  '/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp', NULL, ARRAY['100% ORGANIC COTTON', 'DROP SHOULDER']::text[], 'Pure White', '#F8F9FA',
  '[{"name":"Pure White","hex":"#F8F9FA","slug":"gs-power-heavyweight-oversized-t-shirt-pure-white","image":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"gs-power-heavyweight-oversized-t-shirt-pure-white-black","image":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"gs-power-heavyweight-oversized-t-shirt-pure-white-grey","image":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","fallback":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","alt":"GS Power Heavyweight Oversized T-Shirt front view"},{"type":"image","url":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","fallback":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","alt":"GS Power Heavyweight Oversized T-Shirt side profile view"},{"type":"image","url":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","fallback":"/media/products/catalog/gs-power-heavyweight-oversized-t-shirt-pure-white.webp","alt":"GS Power Heavyweight Oversized T-Shirt back fabric detail"}]'::jsonb, 'The heavyweight gym staple reimagined. Crafted from 240gsm premium combed organic cotton with relaxed drop shoulders, a thick ribbed collar, and archival Gymshark weightlifting graphic print on the back.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Drop-Shoulder Boxy Tee"}'::jsonb,
  4.7, 159, '{"1":1,"2":1,"3":6,"4":25,"5":124}'::jsonb, '{}'::text[]
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'Minimal Strappy Cross-Back Sports Bra', 'Light Support Studio Bralette',
  'women', 'f', 'sports-bras', ARRAY['yoga', 'pilates', 'athleisure']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', NULL, ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'everyday-seamless', 'Minimalist Studio', 35, NULL,
  '/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp', 'Trending', ARRAY['REMOVABLE CUPS', 'LIGHT SUPPORT']::text[], 'Espresso Brown', '#3D2817',
  '[{"name":"Espresso Brown","hex":"#3D2817","slug":"minimal-strappy-cross-back-sports-bra-espresso-brown","image":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"minimal-strappy-cross-back-sports-bra-espresso-brown-black","image":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"minimal-strappy-cross-back-sports-bra-espresso-brown-grey","image":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","fallback":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","alt":"Minimal Strappy Cross-Back Sports Bra front view"},{"type":"image","url":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","fallback":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","alt":"Minimal Strappy Cross-Back Sports Bra side profile view"},{"type":"image","url":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","fallback":"/media/products/catalog/minimal-strappy-cross-back-sports-bra-espresso-brown.webp","alt":"Minimal Strappy Cross-Back Sports Bra back fabric detail"}]'::jsonb, 'Zero hardware, barely-there freedom. Fine cross-back micro straps create a delicate aesthetic while delivering enough support for gentle vinyasa flows, mat pilates, and lounging.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Light Support Studio Bralette"}'::jsonb,
  4.9, 178, '{"1":1,"2":1,"3":7,"4":28,"5":138}'::jsonb, '{}'::text[]
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black', 'apex-seamless-waterproof-running-jacket-stealth-black', 'Apex Seamless Waterproof Running Jacket', 'Stormproof Packable Outerwear',
  'women', 'f', 'jackets', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['reflective', 'sweat-wicking', 'pockets']::text[],
  'vital', 'Apex Performance', 90, 110,
  '/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp', 'Sale', ARRAY['WATER REPELLENT', 'REFLECTIVE 360°']::text[], 'Stealth Black', '#18181A',
  '[{"name":"Stealth Black","hex":"#18181A","slug":"apex-seamless-waterproof-running-jacket-stealth-black","image":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"apex-seamless-waterproof-running-jacket-stealth-black-black","image":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"apex-seamless-waterproof-running-jacket-stealth-black-grey","image":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","fallback":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","alt":"Apex Seamless Waterproof Running Jacket front view"},{"type":"image","url":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","fallback":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","alt":"Apex Seamless Waterproof Running Jacket side profile view"},{"type":"image","url":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","fallback":"/media/products/catalog/apex-seamless-waterproof-running-jacket-stealth-black.webp","alt":"Apex Seamless Waterproof Running Jacket back fabric detail"}]'::jsonb, 'Don’t let weather cancel your road mileage. Ultra-lightweight DWR-coated ripstop fabric with laser-cut underarm ventilation panels, waterproof zipper garages, and 360-degree reflective piping.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Stormproof Packable Outerwear"}'::jsonb,
  4.6, 197, '{"1":1,"2":1,"3":7,"4":31,"5":153}'::jsonb, '{}'::text[]
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'Vital Seamless 2.0 Long Sleeve Crop Top', 'Sweat-Wicking Thumbhole Top',
  'women', 'f', 't-shirts', ARRAY['running', 'weight-lifting', 'pilates']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Vital Seamless', 44, NULL,
  '/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp', 'Bestseller', ARRAY['THUMBHOLES', 'SEAMLESS MARL']::text[], 'Smokey Grey', '#5C5E62',
  '[{"name":"Smokey Grey","hex":"#5C5E62","slug":"vital-seamless-2-0-long-sleeve-crop-top-smokey-grey","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-black","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-grey","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","alt":"Vital Seamless 2.0 Long Sleeve Crop Top front view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","alt":"Vital Seamless 2.0 Long Sleeve Crop Top side profile view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-crop-top-smokey-grey.webp","alt":"Vital Seamless 2.0 Long Sleeve Crop Top back fabric detail"}]'::jsonb, 'Form-accentuating seamless marl knit with body-mapped ventilation zones and comfortable ergonomic thumbholes to keep sleeves securely locked during high-intensity intervals.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Sweat-Wicking Thumbhole Top"}'::jsonb,
  4.8, 216, '{"1":1,"2":1,"3":8,"4":34,"5":168}'::jsonb, '{}'::text[]
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'Training Oversized Fleece Pullover Hoodie', 'Plush Brushed Cotton Interior',
  'women', 'f', 'hoodies', ARRAY['athleisure', 'weight-lifting']::text[],
  'oversized', 'Model is 5''8" (173cm) wearing size S in oversized fit.', NULL, ARRAY['four-way-stretch', 'pockets']::text[],
  'power', 'Training Essentials', 55, NULL,
  '/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp', NULL, ARRAY['KANGAROO POCKET', 'FLEECE LINED']::text[], 'Light Grey Marl', '#D1D3D4',
  '[{"name":"Light Grey Marl","hex":"#D1D3D4","slug":"training-oversized-fleece-pullover-hoodie-light-grey-marl","image":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"training-oversized-fleece-pullover-hoodie-light-grey-marl-black","image":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"training-oversized-fleece-pullover-hoodie-light-grey-marl-grey","image":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","alt":"Training Oversized Fleece Pullover Hoodie front view"},{"type":"image","url":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","alt":"Training Oversized Fleece Pullover Hoodie side profile view"},{"type":"image","url":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/training-oversized-fleece-pullover-hoodie-light-grey-marl.webp","alt":"Training Oversized Fleece Pullover Hoodie back fabric detail"}]'::jsonb, 'Your go-to lazy Sunday or post-leg-day companion. Made with ultra-soft fleece, deep kangaroo pocket, and roomy drop-shoulder cut for ultimate cozy insulation.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Plush Brushed Cotton Interior"}'::jsonb,
  4.5, 235, '{"1":1,"2":1,"3":9,"4":37,"5":183}'::jsonb, '{}'::text[]
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal', 'sweat-seamless-high-waisted-leggings-deep-teal', 'Sweat Seamless High-Waisted Leggings', 'Compressive Rib & Breathable Eyelets',
  'women', 'f', 'leggings', ARRAY['running', 'weight-lifting']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'sweat-wicking', 'four-way-stretch']::text[],
  'everyday-seamless', 'Sweat Seamless', 52, NULL,
  '/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp', 'New', ARRAY['SWEAT-WICKING', 'SQUAT-PROOF']::text[], 'Deep Teal', '#184E59',
  '[{"name":"Deep Teal","hex":"#184E59","slug":"sweat-seamless-high-waisted-leggings-deep-teal","image":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"sweat-seamless-high-waisted-leggings-deep-teal-black","image":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"sweat-seamless-high-waisted-leggings-deep-teal-grey","image":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","fallback":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","alt":"Sweat Seamless High-Waisted Leggings front view"},{"type":"image","url":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","fallback":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","alt":"Sweat Seamless High-Waisted Leggings side profile view"},{"type":"image","url":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","fallback":"/media/products/catalog/sweat-seamless-high-waisted-leggings-deep-teal.webp","alt":"Sweat Seamless High-Waisted Leggings back fabric detail"}]'::jsonb, 'Engineered for your sweatiest sessions. Features targeted eyelet detailing along the thighs for thermoregulation and a 3-tiered compressive ribbed waistband that never budges.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Compressive Rib & Breathable Eyelets"}'::jsonb,
  4.7, 54, '{"1":1,"2":1,"3":2,"4":8,"5":42}'::jsonb, '{}'::text[]
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'Rest Day Lounge Straight Leg Joggers', 'Ultra-Soft Heavyweight Terry',
  'women', 'f', 'joggers', ARRAY['athleisure']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', 'high-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'everyday-seamless', 'Rest Day', 54, NULL,
  '/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp', 'Trending', ARRAY['STRAIGHT LEG', 'ORGANIC TERRY']::text[], 'Oatmeal Marl', '#D8CFC4',
  '[{"name":"Oatmeal Marl","hex":"#D8CFC4","slug":"rest-day-lounge-straight-leg-joggers-oatmeal-marl","image":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"rest-day-lounge-straight-leg-joggers-oatmeal-marl-black","image":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"rest-day-lounge-straight-leg-joggers-oatmeal-marl-grey","image":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","fallback":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","alt":"Rest Day Lounge Straight Leg Joggers front view"},{"type":"image","url":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","fallback":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","alt":"Rest Day Lounge Straight Leg Joggers side profile view"},{"type":"image","url":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","fallback":"/media/products/catalog/rest-day-lounge-straight-leg-joggers-oatmeal-marl.webp","alt":"Rest Day Lounge Straight Leg Joggers back fabric detail"}]'::jsonb, 'Because recovery is where progress happens. Crafted from heavy French terry cotton with relaxed straight legs, an elasticated waistband, and deep slant side pockets.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Ultra-Soft Heavyweight Terry"}'::jsonb,
  4.9, 73, '{"1":1,"2":1,"3":2,"4":11,"5":56}'::jsonb, '{}'::text[]
),
(
  'training-midi-high-neck-sports-bra-navy-blue', 'training-midi-high-neck-sports-bra-navy-blue', 'Training Midi High-Neck Sports Bra', 'High Support Cardio & HIIT Bra',
  'women', 'f', 'sports-bras', ARRAY['running', 'weight-lifting']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Training Core', 40, NULL,
  '/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp', NULL, ARRAY['HIGH SUPPORT', 'HIGH NECK']::text[], 'Navy Blue', '#1B263B',
  '[{"name":"Navy Blue","hex":"#1B263B","slug":"training-midi-high-neck-sports-bra-navy-blue","image":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"training-midi-high-neck-sports-bra-navy-blue-black","image":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"training-midi-high-neck-sports-bra-navy-blue-grey","image":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","fallback":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","alt":"Training Midi High-Neck Sports Bra front view"},{"type":"image","url":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","fallback":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","alt":"Training Midi High-Neck Sports Bra side profile view"},{"type":"image","url":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","fallback":"/media/products/catalog/training-midi-high-neck-sports-bra-navy-blue.webp","alt":"Training Midi High-Neck Sports Bra back fabric detail"}]'::jsonb, 'Maximum coverage and locked-in bounce control. High neckline protects against unintended exposure during burpees and box jumps, supported by a heavy-duty underband.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"High Support Cardio & HIIT Bra"}'::jsonb,
  4.6, 92, '{"1":1,"2":1,"3":3,"4":14,"5":71}'::jsonb, '{}'::text[]
),
(
  'elevate-flared-crossover-leggings-pitch-black', 'elevate-flared-crossover-leggings-pitch-black', 'Elevate Flared Crossover Leggings', 'Buttery Soft V-Front Flare',
  'women', 'f', 'leggings', ARRAY['pilates', 'yoga', 'athleisure']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', 'high-waisted', ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'everyday-seamless', 'Elevate Studio', 58, NULL,
  '/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp', 'Bestseller', ARRAY['V-FRONT WAISTBAND', 'FLARED LEG']::text[], 'Pitch Black', '#111112',
  '[{"name":"Pitch Black","hex":"#111112","slug":"elevate-flared-crossover-leggings-pitch-black","image":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"elevate-flared-crossover-leggings-pitch-black-black","image":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"elevate-flared-crossover-leggings-pitch-black-grey","image":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","fallback":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","alt":"Elevate Flared Crossover Leggings front view"},{"type":"image","url":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","fallback":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","alt":"Elevate Flared Crossover Leggings side profile view"},{"type":"image","url":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","fallback":"/media/products/catalog/elevate-flared-crossover-leggings-pitch-black.webp","alt":"Elevate Flared Crossover Leggings back fabric detail"}]'::jsonb, 'A studio icon. Flattering crossover waistband sculpts your core without pinching, flowing into a graceful flare at the ankle that looks just as chic paired with trainers or platform boots.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Buttery Soft V-Front Flare"}'::jsonb,
  4.8, 111, '{"1":1,"2":1,"3":4,"4":17,"5":86}'::jsonb, '{}'::text[]
),
(
  'gs-lc-ribbed-racerback-tank-forest-green', 'gs-lc-ribbed-racerback-tank-forest-green', 'GS LC Ribbed Racerback Tank', 'Body-Contouring Cotton Rib',
  'women', 'f', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Lifting Club', 30, NULL,
  '/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp', NULL, ARRAY['LIFTING CLUB', 'STRETCH RIB']::text[], 'Forest Green', '#1E3F20',
  '[{"name":"Forest Green","hex":"#1E3F20","slug":"gs-lc-ribbed-racerback-tank-forest-green","image":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"gs-lc-ribbed-racerback-tank-forest-green-black","image":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"gs-lc-ribbed-racerback-tank-forest-green-grey","image":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","fallback":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","alt":"GS LC Ribbed Racerback Tank front view"},{"type":"image","url":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","fallback":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","alt":"GS LC Ribbed Racerback Tank side profile view"},{"type":"image","url":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","fallback":"/media/products/catalog/gs-lc-ribbed-racerback-tank-forest-green.webp","alt":"GS LC Ribbed Racerback Tank back fabric detail"}]'::jsonb, 'Classic collegiate lifting style. Deep scoop neck, narrow racerback cut that showcases upper back muscularity, and archival Gymshark Lifting Club crest embroidered at center chest.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Body-Contouring Cotton Rib"}'::jsonb,
  4.5, 130, '{"1":1,"2":1,"3":5,"4":20,"5":101}'::jsonb, '{}'::text[]
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown', 'everyday-seamless-7-bike-shorts-mocha-brown', 'Everyday Seamless 7" Bike Shorts', 'Chafe-Free Inseam Shorts',
  'women', 'f', 'shorts', ARRAY['running', 'pilates', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch', 'sweat-wicking']::text[],
  'everyday-seamless', 'Everyday Seamless', 42, NULL,
  '/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp', 'New', ARRAY['CHAFE-FREE', '7" INSEAM']::text[], 'Mocha Brown', '#5C4033',
  '[{"name":"Mocha Brown","hex":"#5C4033","slug":"everyday-seamless-7-bike-shorts-mocha-brown","image":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"everyday-seamless-7-bike-shorts-mocha-brown-black","image":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"everyday-seamless-7-bike-shorts-mocha-brown-grey","image":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","fallback":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","alt":"Everyday Seamless 7\" Bike Shorts front view"},{"type":"image","url":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","fallback":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","alt":"Everyday Seamless 7\" Bike Shorts side profile view"},{"type":"image","url":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","fallback":"/media/products/catalog/everyday-seamless-7-bike-shorts-mocha-brown.webp","alt":"Everyday Seamless 7\" Bike Shorts back fabric detail"}]'::jsonb, 'The golden length for comfort and coverage. 7-inch seamless inseam prevents inner thigh chafing on long summer walks and sprint intervals.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Chafe-Free Inseam Shorts"}'::jsonb,
  4.7, 149, '{"1":1,"2":1,"3":5,"4":23,"5":116}'::jsonb, '{}'::text[]
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'Speed Reflective Windbreaker Jacket', 'Ultralight Half-Zip Shell',
  'women', 'f', 'jackets', ARRAY['running', 'hiking']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', NULL, ARRAY['reflective', 'sweat-wicking', 'pockets']::text[],
  'vital', 'Speed Outdoor', 68, 80,
  '/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp', 'Sale', ARRAY['HIGH VISIBILITY', 'PACKABLE']::text[], 'Neon Lime / Black', '#C6FF00',
  '[{"name":"Neon Lime / Black","hex":"#C6FF00","slug":"speed-reflective-windbreaker-jacket-neon-lime-black","image":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"speed-reflective-windbreaker-jacket-neon-lime-black-black","image":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"speed-reflective-windbreaker-jacket-neon-lime-black-grey","image":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","fallback":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","alt":"Speed Reflective Windbreaker Jacket front view"},{"type":"image","url":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","fallback":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","alt":"Speed Reflective Windbreaker Jacket side profile view"},{"type":"image","url":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","fallback":"/media/products/catalog/speed-reflective-windbreaker-jacket-neon-lime-black.webp","alt":"Speed Reflective Windbreaker Jacket back fabric detail"}]'::jsonb, 'Early dawn and twilight safety. High-visibility neon contrast with reflective strips on sleeves and back yolk. Packs down into its own front kangaroo zip pouch.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Ultralight Half-Zip Shell"}'::jsonb,
  4.9, 168, '{"1":1,"2":1,"3":6,"4":26,"5":131}'::jsonb, '{}'::text[]
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'Vital Seamless 2.0 Long Sleeve Top', 'Breathable Training Baselayer',
  'women', 'f', 't-shirts', ARRAY['running', 'weight-lifting']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Vital Seamless', 45, NULL,
  '/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp', NULL, ARRAY['SEAMLESS', 'THUMBHOLES']::text[], 'Blush Pink', '#DE9EAF',
  '[{"name":"Blush Pink","hex":"#DE9EAF","slug":"vital-seamless-2-0-long-sleeve-top-blush-pink","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"vital-seamless-2-0-long-sleeve-top-blush-pink-black","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"vital-seamless-2-0-long-sleeve-top-blush-pink-grey","image":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","alt":"Vital Seamless 2.0 Long Sleeve Top front view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","alt":"Vital Seamless 2.0 Long Sleeve Top side profile view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","fallback":"/media/products/catalog/vital-seamless-2-0-long-sleeve-top-blush-pink.webp","alt":"Vital Seamless 2.0 Long Sleeve Top back fabric detail"}]'::jsonb, 'Second-skin performance feel. Woven with subtle marl knit and micro-perforations across the spine and underarms for continuous cooling during strenuous lifts.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Breathable Training Baselayer"}'::jsonb,
  4.6, 187, '{"1":1,"2":1,"3":7,"4":29,"5":145}'::jsonb, '{}'::text[]
),
(
  'adapt-animal-seamless-leggings-charcoal-grey', 'adapt-animal-seamless-leggings-charcoal-grey', 'Adapt Animal Seamless Leggings', 'Subtle Jacquard Animal Pattern',
  'women', 'f', 'leggings', ARRAY['weight-lifting', 'pilates']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch', 'sweat-wicking']::text[],
  'vital', 'Adapt Seamless', 58, NULL,
  '/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp', 'Trending', ARRAY['SQUAT-PROOF', 'TEXTURED KNIT']::text[], 'Charcoal Grey', '#383838',
  '[{"name":"Charcoal Grey","hex":"#383838","slug":"adapt-animal-seamless-leggings-charcoal-grey","image":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"adapt-animal-seamless-leggings-charcoal-grey-black","image":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"adapt-animal-seamless-leggings-charcoal-grey-grey","image":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","fallback":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","alt":"Adapt Animal Seamless Leggings front view"},{"type":"image","url":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","fallback":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","alt":"Adapt Animal Seamless Leggings side profile view"},{"type":"image","url":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","fallback":"/media/products/catalog/adapt-animal-seamless-leggings-charcoal-grey.webp","alt":"Adapt Animal Seamless Leggings back fabric detail"}]'::jsonb, 'Subtle tone-on-tone jacquard animal pattern knit directly into compressive yarn. Squat-tested to withstand the heaviest barbell work without sheer transparency.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Subtle Jacquard Animal Pattern"}'::jsonb,
  4.8, 206, '{"1":1,"2":1,"3":8,"4":32,"5":160}'::jsonb, '{}'::text[]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES
(
  'fraction-low-back-sports-bra-lilac-dusk', 'fraction-low-back-sports-bra-lilac-dusk', 'Fraction Low-Back Sports Bra', 'Medium Support Asymmetric Strap',
  'women', 'f', 'sports-bras', ARRAY['pilates', 'yoga']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', NULL, ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'everyday-seamless', 'Fraction Collection', 36, NULL,
  '/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp', NULL, ARRAY['OPEN BACK', 'MEDIUM HOLD']::text[], 'Lilac Dusk', '#B695C0',
  '[{"name":"Lilac Dusk","hex":"#B695C0","slug":"fraction-low-back-sports-bra-lilac-dusk","image":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"fraction-low-back-sports-bra-lilac-dusk-black","image":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"fraction-low-back-sports-bra-lilac-dusk-grey","image":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","fallback":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","alt":"Fraction Low-Back Sports Bra front view"},{"type":"image","url":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","fallback":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","alt":"Fraction Low-Back Sports Bra side profile view"},{"type":"image","url":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","fallback":"/media/products/catalog/fraction-low-back-sports-bra-lilac-dusk.webp","alt":"Fraction Low-Back Sports Bra back fabric detail"}]'::jsonb, 'Clean geometry meets delicate detailing. An open low-back design lets your lats breathe freely while a supportive double-layered front keeps everything comfortably secure.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Medium Support Asymmetric Strap"}'::jsonb,
  4.5, 225, '{"1":1,"2":1,"3":9,"4":36,"5":175}'::jsonb, '{}'::text[]
),
(
  'power-muscle-tank-top-deep-plum', 'power-muscle-tank-top-deep-plum', 'Power Muscle Tank Top', 'Deep Cut Armholes for Lifting',
  'women', 'f', 't-shirts', ARRAY['weight-lifting']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 28, NULL,
  '/media/products/catalog/power-muscle-tank-top-deep-plum.webp', NULL, ARRAY['BREATHABLE', 'COTTON BLEND']::text[], 'Deep Plum', '#4A154B',
  '[{"name":"Deep Plum","hex":"#4A154B","slug":"power-muscle-tank-top-deep-plum","image":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"power-muscle-tank-top-deep-plum-black","image":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"power-muscle-tank-top-deep-plum-grey","image":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","fallback":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","alt":"Power Muscle Tank Top front view"},{"type":"image","url":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","fallback":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","alt":"Power Muscle Tank Top side profile view"},{"type":"image","url":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","fallback":"/media/products/catalog/power-muscle-tank-top-deep-plum.webp","alt":"Power Muscle Tank Top back fabric detail"}]'::jsonb, 'Designed so you can monitor upper back and deltoid engagement in the mirrors. Dropped armholes and a curved drop-tail hem for full mobility.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Deep Cut Armholes for Lifting"}'::jsonb,
  4.7, 244, '{"1":1,"2":1,"3":9,"4":39,"5":190}'::jsonb, '{}'::text[]
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red', 'hyper-amplified-high-waisted-leggings-crimson-red', 'Hyper Amplified High-Waisted Leggings', 'Maximum Glute Contouring Rib',
  'women', 'f', 'leggings', ARRAY['weight-lifting']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch', 'sweat-wicking']::text[],
  'power', 'Hyper Amplified', 62, NULL,
  '/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp', 'Bestseller', ARRAY['CONTOUR RIB', 'MAX COMPRESSION']::text[], 'Crimson Red', '#990000',
  '[{"name":"Crimson Red","hex":"#990000","slug":"hyper-amplified-high-waisted-leggings-crimson-red","image":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"hyper-amplified-high-waisted-leggings-crimson-red-black","image":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"hyper-amplified-high-waisted-leggings-crimson-red-grey","image":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","fallback":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","alt":"Hyper Amplified High-Waisted Leggings front view"},{"type":"image","url":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","fallback":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","alt":"Hyper Amplified High-Waisted Leggings side profile view"},{"type":"image","url":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","fallback":"/media/products/catalog/hyper-amplified-high-waisted-leggings-crimson-red.webp","alt":"Hyper Amplified High-Waisted Leggings back fabric detail"}]'::jsonb, 'Our most supportive compression yet. Targeted under-glute structural knitting and ultra-dense high-twist yarn provide unmatched shaping and squat-proof reliability.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Maximum Glute Contouring Rib"}'::jsonb,
  4.9, 63, '{"1":1,"2":1,"3":2,"4":10,"5":49}'::jsonb, '{}'::text[]
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'Heavyweight Fleece Crewneck Sweatshirt', 'Brushed Cotton Heritage Pullover',
  'women', 'f', 'hoodies', ARRAY['athleisure']::text[],
  'oversized', 'Model is 5''8" (173cm) wearing size S in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'everyday-seamless', 'Heritage Lounge', 52, NULL,
  '/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp', NULL, ARRAY['HEAVYWEIGHT', 'ORGANIC COTTON']::text[], 'Sand Dunes', '#C2B280',
  '[{"name":"Sand Dunes","hex":"#C2B280","slug":"heavyweight-fleece-crewneck-sweatshirt-sand-dunes","image":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"heavyweight-fleece-crewneck-sweatshirt-sand-dunes-black","image":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"heavyweight-fleece-crewneck-sweatshirt-sand-dunes-grey","image":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","fallback":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","alt":"Heavyweight Fleece Crewneck Sweatshirt front view"},{"type":"image","url":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","fallback":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","alt":"Heavyweight Fleece Crewneck Sweatshirt side profile view"},{"type":"image","url":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","fallback":"/media/products/catalog/heavyweight-fleece-crewneck-sweatshirt-sand-dunes.webp","alt":"Heavyweight Fleece Crewneck Sweatshirt back fabric detail"}]'::jsonb, 'Thick, plush, and effortlessly boxy. Made from 360gsm organic fleece with ribbed side panels and a subtle tone-on-tone embroidered Gymshark script.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Brushed Cotton Heritage Pullover"}'::jsonb,
  4.6, 82, '{"1":1,"2":1,"3":3,"4":13,"5":63}'::jsonb, '{}'::text[]
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'Apex Seamless 2-in-1 Running Shorts', 'Built-in Compression Liner',
  'women', 'f', 'shorts', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', 'mid-waisted', ARRAY['pockets', 'reflective', 'sweat-wicking']::text[],
  'vital', 'Apex Performance', 48, NULL,
  '/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp', 'New', ARRAY['2-IN-1 LINER', 'PHONE POCKET']::text[], 'Pitch Black', '#151515',
  '[{"name":"Pitch Black","hex":"#151515","slug":"apex-seamless-2-in-1-running-shorts-pitch-black","image":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"apex-seamless-2-in-1-running-shorts-pitch-black-black","image":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"apex-seamless-2-in-1-running-shorts-pitch-black-grey","image":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","fallback":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","alt":"Apex Seamless 2-in-1 Running Shorts front view"},{"type":"image","url":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","fallback":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","alt":"Apex Seamless 2-in-1 Running Shorts side profile view"},{"type":"image","url":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","fallback":"/media/products/catalog/apex-seamless-2-in-1-running-shorts-pitch-black.webp","alt":"Apex Seamless 2-in-1 Running Shorts back fabric detail"}]'::jsonb, 'Zero chafing, full storage. A featherweight 3" woven shell over a supportive 5" compression liner equipped with a secure bounce-free phone pocket.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Built-in Compression Liner"}'::jsonb,
  4.8, 101, '{"1":1,"2":1,"3":4,"4":16,"5":78}'::jsonb, '{}'::text[]
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'Sport Contour Scoop Neck Sports Bra', 'Sweat-Defeating Medium Support',
  'women', 'f', 'sports-bras', ARRAY['running', 'weight-lifting', 'pilates']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Sport Contour', 38, NULL,
  '/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp', 'Trending', ARRAY['COOL TOUCH', 'ANTI-ODOR']::text[], 'Electric Blue', '#0055FF',
  '[{"name":"Electric Blue","hex":"#0055FF","slug":"sport-contour-scoop-neck-sports-bra-electric-blue","image":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"sport-contour-scoop-neck-sports-bra-electric-blue-black","image":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"sport-contour-scoop-neck-sports-bra-electric-blue-grey","image":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","fallback":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","alt":"Sport Contour Scoop Neck Sports Bra front view"},{"type":"image","url":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","fallback":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","alt":"Sport Contour Scoop Neck Sports Bra side profile view"},{"type":"image","url":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","fallback":"/media/products/catalog/sport-contour-scoop-neck-sports-bra-electric-blue.webp","alt":"Sport Contour Scoop Neck Sports Bra back fabric detail"}]'::jsonb, 'Engineered with quick-dry cooling microfibers that pull sweat away in seconds. Wide supportive shoulder straps distribute pressure evenly across traps.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Sweat-Defeating Medium Support"}'::jsonb,
  4.5, 120, '{"1":1,"2":1,"3":4,"4":19,"5":93}'::jsonb, '{}'::text[]
),
(
  'training-lightweight-woven-track-pants-olive-green', 'training-lightweight-woven-track-pants-olive-green', 'Training Lightweight Woven Track Pants', 'Elastic Cuffs & Zipper Pockets',
  'women', 'f', 'joggers', ARRAY['running', 'athleisure', 'hiking']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', 'mid-waisted', ARRAY['pockets', 'sweat-wicking', 'four-way-stretch']::text[],
  'everyday-seamless', 'Training Essentials', 55, 65,
  '/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp', 'Sale', ARRAY['ZIP POCKETS', 'WATER RESISTANT']::text[], 'Olive Green', '#556B2F',
  '[{"name":"Olive Green","hex":"#556B2F","slug":"training-lightweight-woven-track-pants-olive-green","image":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"training-lightweight-woven-track-pants-olive-green-black","image":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"training-lightweight-woven-track-pants-olive-green-grey","image":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","fallback":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","alt":"Training Lightweight Woven Track Pants front view"},{"type":"image","url":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","fallback":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","alt":"Training Lightweight Woven Track Pants side profile view"},{"type":"image","url":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","fallback":"/media/products/catalog/training-lightweight-woven-track-pants-olive-green.webp","alt":"Training Lightweight Woven Track Pants back fabric detail"}]'::jsonb, 'Crisp, lightweight stretch woven fabric with water-resistant coating. Ankle zips allow you to easily pull them on and off over your training shoes.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Elastic Cuffs & Zipper Pockets"}'::jsonb,
  4.7, 139, '{"1":1,"2":1,"3":5,"4":22,"5":108}'::jsonb, '{}'::text[]
),
(
  'softsense-ribbed-cami-tank-chalk-white', 'softsense-ribbed-cami-tank-chalk-white', 'SoftSense Ribbed Cami Tank', 'Built-in Shelf Bra Studio Tank',
  'women', 'f', 't-shirts', ARRAY['pilates', 'yoga', 'athleisure']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['four-way-stretch', 'sweat-wicking']::text[],
  'softsense', 'SoftSense™', 40, NULL,
  '/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp', 'New', ARRAY['SHELF BRA', 'SOFTSENSE™']::text[], 'Chalk White', '#F5F5F0',
  '[{"name":"Chalk White","hex":"#F5F5F0","slug":"softsense-ribbed-cami-tank-chalk-white","image":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"softsense-ribbed-cami-tank-chalk-white-black","image":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"softsense-ribbed-cami-tank-chalk-white-grey","image":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","fallback":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","alt":"SoftSense Ribbed Cami Tank front view"},{"type":"image","url":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","fallback":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","alt":"SoftSense Ribbed Cami Tank side profile view"},{"type":"image","url":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","fallback":"/media/products/catalog/softsense-ribbed-cami-tank-chalk-white.webp","alt":"SoftSense Ribbed Cami Tank back fabric detail"}]'::jsonb, 'All-in-one studio elegance. Featuring a built-in shelf bra with removable cups and a fine micro-ribbed modal blend that hugs like a second skin.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Built-in Shelf Bra Studio Tank"}'::jsonb,
  4.9, 158, '{"1":1,"2":1,"3":6,"4":25,"5":123}'::jsonb, '{}'::text[]
),
(
  'vital-seamless-2-0-4-shorts-emerald-green', 'vital-seamless-2-0-4-shorts-emerald-green', 'Vital Seamless 2.0 4" Shorts', 'Squat-Proof Lifting Shorts',
  'women', 'f', 'shorts', ARRAY['weight-lifting', 'running']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Vital Seamless', 40, NULL,
  '/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp', 'Bestseller', ARRAY['BESTSELLER', 'SQUAT-PROOF']::text[], 'Emerald Green', '#097969',
  '[{"name":"Emerald Green","hex":"#097969","slug":"vital-seamless-2-0-4-shorts-emerald-green","image":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"vital-seamless-2-0-4-shorts-emerald-green-black","image":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"vital-seamless-2-0-4-shorts-emerald-green-grey","image":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","fallback":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","alt":"Vital Seamless 2.0 4\" Shorts front view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","fallback":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","alt":"Vital Seamless 2.0 4\" Shorts side profile view"},{"type":"image","url":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","fallback":"/media/products/catalog/vital-seamless-2-0-4-shorts-emerald-green.webp","alt":"Vital Seamless 2.0 4\" Shorts back fabric detail"}]'::jsonb, 'The world’s most popular lifting short. 4-inch inseam showcases quad definition without riding up during deep barbell back squats or hip thrusts.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Squat-Proof Lifting Shorts"}'::jsonb,
  4.6, 177, '{"1":1,"2":1,"3":7,"4":28,"5":138}'::jsonb, '{}'::text[]
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'GS Power Multi-Strap Lifting Bra', 'Reinforced High Support Bra',
  'women', 'f', 'sports-bras', ARRAY['weight-lifting']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'power', 'Power', 44, NULL,
  '/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp', NULL, ARRAY['MULTI-STRAP', 'HEAVY SUPPORT']::text[], 'Terracotta Rust', '#E2725B',
  '[{"name":"Terracotta Rust","hex":"#E2725B","slug":"gs-power-multi-strap-lifting-bra-terracotta-rust","image":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"gs-power-multi-strap-lifting-bra-terracotta-rust-black","image":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"gs-power-multi-strap-lifting-bra-terracotta-rust-grey","image":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","fallback":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","alt":"GS Power Multi-Strap Lifting Bra front view"},{"type":"image","url":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","fallback":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","alt":"GS Power Multi-Strap Lifting Bra side profile view"},{"type":"image","url":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","fallback":"/media/products/catalog/gs-power-multi-strap-lifting-bra-terracotta-rust.webp","alt":"GS Power Multi-Strap Lifting Bra back fabric detail"}]'::jsonb, 'Built specifically for heavy lifters. Multiple criss-crossing back tension bands distribute barbell contact evenly across the upper traps during squats.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Reinforced High Support Bra"}'::jsonb,
  4.8, 196, '{"1":1,"2":1,"3":7,"4":31,"5":152}'::jsonb, '{}'::text[]
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'Rest Day Seamless All-In-One Unitard', 'Sculpting Bodysuit with Open Back',
  'women', 'f', 'leggings', ARRAY['pilates', 'yoga', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch']::text[],
  'everyday-seamless', 'Studio Bodysuits', 68, NULL,
  '/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp', 'Trending', ARRAY['ONE-PIECE', 'SCULPTING']::text[], 'Obsidian Black', '#1B1B1B',
  '[{"name":"Obsidian Black","hex":"#1B1B1B","slug":"rest-day-seamless-all-in-one-unitard-obsidian-black","image":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"rest-day-seamless-all-in-one-unitard-obsidian-black-black","image":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"rest-day-seamless-all-in-one-unitard-obsidian-black-grey","image":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","fallback":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","alt":"Rest Day Seamless All-In-One Unitard front view"},{"type":"image","url":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","fallback":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","alt":"Rest Day Seamless All-In-One Unitard side profile view"},{"type":"image","url":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","fallback":"/media/products/catalog/rest-day-seamless-all-in-one-unitard-obsidian-black.webp","alt":"Rest Day Seamless All-In-One Unitard back fabric detail"}]'::jsonb, 'One piece, zero fuss. Ribbed midsection contours the waist while a low scooped back adds studio sophistication. Pairs effortlessly under an oversized boyfriend blazer.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Sculpting Bodysuit with Open Back"}'::jsonb,
  4.5, 215, '{"1":1,"2":1,"3":8,"4":34,"5":167}'::jsonb, '{}'::text[]
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'Studio High-Rise Flared Ribbed Pants', 'Split Hem Bootcut Silhouette',
  'women', 'f', 'joggers', ARRAY['yoga', 'pilates', 'athleisure']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', 'high-waisted', ARRAY['four-way-stretch']::text[],
  'everyday-seamless', 'Studio Lounge', 52, NULL,
  '/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp', NULL, ARRAY['SPLIT HEM', 'BUTTERY SOFT']::text[], 'Charcoal Heather', '#424242',
  '[{"name":"Charcoal Heather","hex":"#424242","slug":"studio-high-rise-flared-ribbed-pants-charcoal-heather","image":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"studio-high-rise-flared-ribbed-pants-charcoal-heather-black","image":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"studio-high-rise-flared-ribbed-pants-charcoal-heather-grey","image":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","fallback":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","alt":"Studio High-Rise Flared Ribbed Pants front view"},{"type":"image","url":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","fallback":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","alt":"Studio High-Rise Flared Ribbed Pants side profile view"},{"type":"image","url":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","fallback":"/media/products/catalog/studio-high-rise-flared-ribbed-pants-charcoal-heather.webp","alt":"Studio High-Rise Flared Ribbed Pants back fabric detail"}]'::jsonb, 'The viral split-hem silhouette. Extra-long legs flare over sneakers with side ankle slits that create a slimming, elongated leg line.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Split Hem Bootcut Silhouette"}'::jsonb,
  4.7, 234, '{"1":1,"2":1,"3":9,"4":37,"5":182}'::jsonb, '{}'::text[]
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'Legacy Graphic Oversized Heavyweight Tee', 'Vintage Gymshark Gold Era Graphic',
  'women', 'f', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 5''8" (173cm) wearing size S in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Legacy Archive', 38, NULL,
  '/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp', 'New', ARRAY['ARCHIVAL GRAPHIC', 'VINTAGE WASH']::text[], 'Faded Navy', '#2B3A42',
  '[{"name":"Faded Navy","hex":"#2B3A42","slug":"legacy-graphic-oversized-heavyweight-tee-faded-navy","image":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"legacy-graphic-oversized-heavyweight-tee-faded-navy-black","image":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"legacy-graphic-oversized-heavyweight-tee-faded-navy-grey","image":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","fallback":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","alt":"Legacy Graphic Oversized Heavyweight Tee front view"},{"type":"image","url":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","fallback":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","alt":"Legacy Graphic Oversized Heavyweight Tee side profile view"},{"type":"image","url":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","fallback":"/media/products/catalog/legacy-graphic-oversized-heavyweight-tee-faded-navy.webp","alt":"Legacy Graphic Oversized Heavyweight Tee back fabric detail"}]'::jsonb, 'An ode to where we began. Distressed screenprint graphic of the original 2012 Gymshark gym badge on 100% heavy mineral-washed cotton.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Vintage Gymshark Gold Era Graphic"}'::jsonb,
  4.9, 53, '{"1":1,"2":1,"3":2,"4":8,"5":41}'::jsonb, '{}'::text[]
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe', 'elevate-packable-windbreaker-anorak-pale-taupe', 'Elevate Packable Windbreaker Anorak', 'Water-Resistant Outdoor Half-Zip',
  'women', 'f', 'jackets', ARRAY['hiking', 'running']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', NULL, ARRAY['reflective', 'pockets', 'sweat-wicking']::text[],
  'vital', 'Elevate Studio', 72, 85,
  '/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp', 'Sale', ARRAY['PACKABLE', 'WATER RESISTANT']::text[], 'Pale Taupe', '#B38B6D',
  '[{"name":"Pale Taupe","hex":"#B38B6D","slug":"elevate-packable-windbreaker-anorak-pale-taupe","image":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"elevate-packable-windbreaker-anorak-pale-taupe-black","image":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"elevate-packable-windbreaker-anorak-pale-taupe-grey","image":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","fallback":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","alt":"Elevate Packable Windbreaker Anorak front view"},{"type":"image","url":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","fallback":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","alt":"Elevate Packable Windbreaker Anorak side profile view"},{"type":"image","url":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","fallback":"/media/products/catalog/elevate-packable-windbreaker-anorak-pale-taupe.webp","alt":"Elevate Packable Windbreaker Anorak back fabric detail"}]'::jsonb, 'Versatile outdoor anorak with an adjustable bungee hem and storm flap hood. Made with recycled polyester and sealed seams.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Water-Resistant Outdoor Half-Zip"}'::jsonb,
  4.6, 72, '{"1":1,"2":1,"3":2,"4":11,"5":56}'::jsonb, '{}'::text[]
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'Adapt Fleck Seamless High-Waisted Leggings', 'Multi-Color Fleck Marl Compression',
  'women', 'f', 'leggings', ARRAY['weight-lifting', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Adapt Seamless', 60, NULL,
  '/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp', 'Trending', ARRAY['FLECK KNIT', 'SQUAT-PROOF']::text[], 'Lavender Blue Fleck', '#7B88B2',
  '[{"name":"Lavender Blue Fleck","hex":"#7B88B2","slug":"adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck","image":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-black","image":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-grey","image":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","fallback":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","alt":"Adapt Fleck Seamless High-Waisted Leggings front view"},{"type":"image","url":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","fallback":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","alt":"Adapt Fleck Seamless High-Waisted Leggings side profile view"},{"type":"image","url":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","fallback":"/media/products/catalog/adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck.webp","alt":"Adapt Fleck Seamless High-Waisted Leggings back fabric detail"}]'::jsonb, 'Engineered with vibrant contrasting fleck yarns woven into high-compression seamless fabric. Glute-accentuating back contour panels deliver shape and security.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Multi-Color Fleck Marl Compression"}'::jsonb,
  4.8, 91, '{"1":1,"2":1,"3":3,"4":14,"5":70}'::jsonb, '{}'::text[]
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'Minimal Clean-Cut Cross-Back Bralette', 'Seamless Wireless Comfort Bra',
  'women', 'f', 'sports-bras', ARRAY['yoga', 'pilates', 'athleisure']::text[],
  'regular', 'Model is 5''8" (173cm) wearing size S in regular fit.', NULL, ARRAY['four-way-stretch']::text[],
  'everyday-seamless', 'Minimalist Studio', 32, NULL,
  '/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp', NULL, ARRAY['WIRELESS', 'SECOND SKIN']::text[], 'Dusty Rose', '#DCAE96',
  '[{"name":"Dusty Rose","hex":"#DCAE96","slug":"minimal-clean-cut-cross-back-bralette-dusty-rose","image":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"minimal-clean-cut-cross-back-bralette-dusty-rose-black","image":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"minimal-clean-cut-cross-back-bralette-dusty-rose-grey","image":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","fallback":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","alt":"Minimal Clean-Cut Cross-Back Bralette front view"},{"type":"image","url":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","fallback":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","alt":"Minimal Clean-Cut Cross-Back Bralette side profile view"},{"type":"image","url":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","fallback":"/media/products/catalog/minimal-clean-cut-cross-back-bralette-dusty-rose.webp","alt":"Minimal Clean-Cut Cross-Back Bralette back fabric detail"}]'::jsonb, 'No wires, no pressure points. Seamless circular knit wraps around your ribs smoothly with removable padding and anti-dig flat shoulder straps.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Seamless Wireless Comfort Bra"}'::jsonb,
  4.5, 110, '{"1":1,"2":1,"3":4,"4":17,"5":85}'::jsonb, '{}'::text[]
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow', 'training-loose-fit-breathable-tank-sunburst-yellow', 'Training Loose Fit Breathable Tank', 'Featherweight Dropped Armhole Tank',
  'women', 'f', 't-shirts', ARRAY['running', 'weight-lifting']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Training Core', 26, NULL,
  '/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp', NULL, ARRAY['BREATHABLE', 'ULTRA LIGHT']::text[], 'Sunburst Yellow', '#F4C430',
  '[{"name":"Sunburst Yellow","hex":"#F4C430","slug":"training-loose-fit-breathable-tank-sunburst-yellow","image":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"training-loose-fit-breathable-tank-sunburst-yellow-black","image":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"training-loose-fit-breathable-tank-sunburst-yellow-grey","image":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","fallback":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","alt":"Training Loose Fit Breathable Tank front view"},{"type":"image","url":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","fallback":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","alt":"Training Loose Fit Breathable Tank side profile view"},{"type":"image","url":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","fallback":"/media/products/catalog/training-loose-fit-breathable-tank-sunburst-yellow.webp","alt":"Training Loose Fit Breathable Tank back fabric detail"}]'::jsonb, 'A pop of summer energy for hot gym sessions. Ultra-lightweight polyester mesh wicks away moisture in record time.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Featherweight Dropped Armhole Tank"}'::jsonb,
  4.7, 129, '{"1":1,"2":1,"3":5,"4":20,"5":100}'::jsonb, '{}'::text[]
),
(
  'vital-seamless-half-zip-pullover-steel-blue', 'vital-seamless-half-zip-pullover-steel-blue', 'Vital Seamless Half-Zip Pullover', 'High Collar Form-Fitting Top',
  'women', 'f', 'hoodies', ARRAY['running', 'weight-lifting']::text[],
  'slim', 'Model is 5''8" (173cm) wearing size S in slim fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Vital Seamless', 48, NULL,
  '/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp', 'Bestseller', ARRAY['HALF-ZIP', 'SEAMLESS']::text[], 'Steel Blue', '#4682B4',
  '[{"name":"Steel Blue","hex":"#4682B4","slug":"vital-seamless-half-zip-pullover-steel-blue","image":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"vital-seamless-half-zip-pullover-steel-blue-black","image":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"vital-seamless-half-zip-pullover-steel-blue-grey","image":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","fallback":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","alt":"Vital Seamless Half-Zip Pullover front view"},{"type":"image","url":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","fallback":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","alt":"Vital Seamless Half-Zip Pullover side profile view"},{"type":"image","url":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","fallback":"/media/products/catalog/vital-seamless-half-zip-pullover-steel-blue.webp","alt":"Vital Seamless Half-Zip Pullover back fabric detail"}]'::jsonb, 'The perfect transition layer. A quarter-zip front lets you dump heat quickly mid-workout, paired with signature Vital marl compression.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"High Collar Form-Fitting Top"}'::jsonb,
  4.9, 148, '{"1":1,"2":1,"3":5,"4":23,"5":115}'::jsonb, '{}'::text[]
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry', 'power-ribbed-cycle-shorts-8-dark-cherry', 'Power Ribbed Cycle Shorts 8"', 'Thick Sculpting Barbell Shorts',
  'women', 'f', 'shorts', ARRAY['weight-lifting', 'athleisure']::text[],
  'compression', 'Model is 5''8" (173cm) wearing size S in compression fit.', 'high-waisted', ARRAY['squat-proof', 'four-way-stretch', 'pockets']::text[],
  'power', 'Power', 44, NULL,
  '/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp', NULL, ARRAY['BARBELL TESTED', 'SIDE POCKET']::text[], 'Dark Cherry', '#58111A',
  '[{"name":"Dark Cherry","hex":"#58111A","slug":"power-ribbed-cycle-shorts-8-dark-cherry","image":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"power-ribbed-cycle-shorts-8-dark-cherry-black","image":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"power-ribbed-cycle-shorts-8-dark-cherry-grey","image":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","fallback":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","alt":"Power Ribbed Cycle Shorts 8\" front view"},{"type":"image","url":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","fallback":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","alt":"Power Ribbed Cycle Shorts 8\" side profile view"},{"type":"image","url":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","fallback":"/media/products/catalog/power-ribbed-cycle-shorts-8-dark-cherry.webp","alt":"Power Ribbed Cycle Shorts 8\" back fabric detail"}]'::jsonb, 'Built for heavy knurled barbell contact. Abrasion-resistant heavy rib fabric shields your quads from scrape marks during heavy deadlifts.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Thick Sculpting Barbell Shorts"}'::jsonb,
  4.6, 167, '{"1":1,"2":1,"3":6,"4":26,"5":130}'::jsonb, '{}'::text[]
),
(
  'essential-boxy-cropped-t-shirt-chalk-white', 'essential-boxy-cropped-t-shirt-chalk-white', 'Essential Boxy Cropped T-Shirt', 'Heavy Cotton Everyday Silhouette',
  'women', 'f', 't-shirts', ARRAY['athleisure']::text[],
  'relaxed', 'Model is 5''8" (173cm) wearing size S in relaxed fit.', NULL, ARRAY['four-way-stretch']::text[],
  'everyday-seamless', 'Everyday Essentials', 32, NULL,
  '/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp', NULL, ARRAY['100% COTTON', 'BOXY FIT']::text[], 'Chalk White', '#FFFFFF',
  '[{"name":"Chalk White","hex":"#FFFFFF","slug":"essential-boxy-cropped-t-shirt-chalk-white","image":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","isCurrent":true},{"name":"Black","hex":"#1C1C1E","slug":"essential-boxy-cropped-t-shirt-chalk-white-black","image":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","isCurrent":false},{"name":"Stone Grey","hex":"#8E8E93","slug":"essential-boxy-cropped-t-shirt-chalk-white-grey","image":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","alt":"Essential Boxy Cropped T-Shirt front view"},{"type":"image","url":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","alt":"Essential Boxy Cropped T-Shirt side profile view"},{"type":"image","url":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/essential-boxy-cropped-t-shirt-chalk-white.webp","alt":"Essential Boxy Cropped T-Shirt back fabric detail"}]'::jsonb, 'Simple, timeless, premium. 100% thick jersey cotton cut into a modern wide-boxy cropped cut that pairs cleanly with high-waisted bottoms.', ARRAY['Engineered for premium comfort and high durability', 'Sweat-wicking technical fabric maintains cool core temperature', 'Tested by elite Gymshark athletes and powerlifters']::text[],
  '82% Nylon, 18% Elastane / Lycra Adaptiv', ARRAY['Machine wash cold inside out (30°C)', 'Do not iron prints or trims', 'Air dry naturally or tumble dry low']::text[], '{"runsSmall":8,"trueToSize":84,"runsLarge":8,"softnessRating":95,"supportRating":"Heavy Cotton Everyday Silhouette"}'::jsonb,
  4.8, 186, '{"1":1,"2":1,"3":7,"4":29,"5":145}'::jsonb, '{}'::text[]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES
(
  'power-heavyweight-oversized-t-shirt-washed-black', 'power-heavyweight-oversized-t-shirt-washed-black', 'Power Heavyweight Oversized T-Shirt', 'Heavy Cotton Lifting Pump Cover',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 38, NULL,
  '/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp', 'Bestseller', ARRAY['PUMP COVER', '250 GSM COTTON']::text[], 'Washed Black', '#252525',
  '[{"name":"Washed Black","hex":"#252525","slug":"power-heavyweight-oversized-t-shirt-washed-black","image":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"power-heavyweight-oversized-t-shirt-washed-black-black","image":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"power-heavyweight-oversized-t-shirt-washed-black-charcoal","image":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","fallback":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","alt":"Power Heavyweight Oversized T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","fallback":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","alt":"Power Heavyweight Oversized T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","fallback":"/media/products/catalog/power-heavyweight-oversized-t-shirt-washed-black.webp","alt":"Power Heavyweight Oversized T-Shirt movement rear view"}]'::jsonb, 'The heavyweight king of the gym floor. Thick 250gsm vintage-washed cotton with exaggerated drop shoulders, reinforced rib crewneck, and iconic raw lifting presence.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Heavy Cotton Lifting Pump Cover"}'::jsonb,
  4.6, 38, '{"1":0,"2":1,"3":1,"4":5,"5":31}'::jsonb, '{}'::text[]
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'Apex Hybrid 5" Performance Running Shorts', 'Split-Hem Ultra-Lightweight Shorts',
  'men', 'm', 'shorts', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', 'mid-waisted', ARRAY['reflective', 'sweat-wicking', 'pockets', 'four-way-stretch']::text[],
  'vital', 'Apex Performance', 48, NULL,
  '/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp', 'Trending', ARRAY['SPLIT HEM', 'ZIP PHONE POCKET']::text[], 'Stealth Black', '#121212',
  '[{"name":"Stealth Black","hex":"#121212","slug":"apex-hybrid-5-performance-running-shorts-stealth-black","image":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"apex-hybrid-5-performance-running-shorts-stealth-black-black","image":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"apex-hybrid-5-performance-running-shorts-stealth-black-charcoal","image":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","fallback":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","alt":"Apex Hybrid 5\" Performance Running Shorts studio front view"},{"type":"image","url":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","fallback":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","alt":"Apex Hybrid 5\" Performance Running Shorts muscle taper profile"},{"type":"image","url":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","fallback":"/media/products/catalog/apex-hybrid-5-performance-running-shorts-stealth-black.webp","alt":"Apex Hybrid 5\" Performance Running Shorts movement rear view"}]'::jsonb, 'Engineered for unrestricted cadence. Featherweight 4-way stretch fabric with side split hems, laser ventilation holes, and an internal zippered bounce-proof phone pocket.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Split-Hem Ultra-Lightweight Shorts"}'::jsonb,
  4.9, 61, '{"1":0,"2":1,"3":1,"4":8,"5":50}'::jsonb, '{}'::text[]
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'Crest Heavyweight Pullover Hoodie', 'Brushed Interior Fleece Hood',
  'men', 'm', 'hoodies', ARRAY['athleisure', 'weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['four-way-stretch', 'pockets']::text[],
  'power', 'Crest Collection', 55, NULL,
  '/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp', 'Bestseller', ARRAY['EMBROIDERED LOGO', 'KANGAROO POCKET']::text[], 'Navy Blue Marl', '#1D2A44',
  '[{"name":"Navy Blue Marl","hex":"#1D2A44","slug":"crest-heavyweight-pullover-hoodie-navy-blue-marl","image":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"crest-heavyweight-pullover-hoodie-navy-blue-marl-black","image":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"crest-heavyweight-pullover-hoodie-navy-blue-marl-charcoal","image":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","fallback":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","alt":"Crest Heavyweight Pullover Hoodie studio front view"},{"type":"image","url":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","fallback":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","alt":"Crest Heavyweight Pullover Hoodie muscle taper profile"},{"type":"image","url":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","fallback":"/media/products/catalog/crest-heavyweight-pullover-hoodie-navy-blue-marl.webp","alt":"Crest Heavyweight Pullover Hoodie movement rear view"}]'::jsonb, 'A genuine Gymshark essential since day one. Soft brushed fleece lining, tonal embroidered chest crest, double-layered drawstring hood, and durable ribbed hems.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Brushed Interior Fleece Hood"}'::jsonb,
  4.8, 84, '{"1":0,"2":1,"3":2,"4":11,"5":68}'::jsonb, '{}'::text[]
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'Critical 2.0 Drop Arm Stringer Vest', 'Classic Bodybuilder Cut Tank',
  'men', 'm', 't-shirts', ARRAY['weight-lifting']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'power', 'Critical 2.0', 25, NULL,
  '/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp', NULL, ARRAY['STRINGER CUT', 'Y-BACK']::text[], 'Charcoal Marl', '#3A3D40',
  '[{"name":"Charcoal Marl","hex":"#3A3D40","slug":"critical-2-0-drop-arm-stringer-vest-charcoal-marl","image":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"critical-2-0-drop-arm-stringer-vest-charcoal-marl-black","image":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"critical-2-0-drop-arm-stringer-vest-charcoal-marl-charcoal","image":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","fallback":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","alt":"Critical 2.0 Drop Arm Stringer Vest studio front view"},{"type":"image","url":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","fallback":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","alt":"Critical 2.0 Drop Arm Stringer Vest muscle taper profile"},{"type":"image","url":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","fallback":"/media/products/catalog/critical-2-0-drop-arm-stringer-vest-charcoal-marl.webp","alt":"Critical 2.0 Drop Arm Stringer Vest movement rear view"}]'::jsonb, 'Unapologetic old-school bodybuilding. Deep drop-armholes and a thin Y-back design provide completely unobstructed shoulder and lat mobility under heavy bench presses.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Classic Bodybuilder Cut Tank"}'::jsonb,
  4.7, 107, '{"1":0,"2":1,"3":3,"4":14,"5":87}'::jsonb, '{}'::text[]
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'Arrival 7" Slim Fit Training Shorts', 'Breathable Lightweight Gym Shorts',
  'men', 'm', 'shorts', ARRAY['weight-lifting', 'running']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', 'mid-waisted', ARRAY['sweat-wicking', 'four-way-stretch', 'pockets']::text[],
  'everyday-seamless', 'Arrival Series', 32, NULL,
  '/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp', 'Bestseller', ARRAY['7" INSEAM', 'QUICK DRY']::text[], 'Graphite Grey', '#48494B',
  '[{"name":"Graphite Grey","hex":"#48494B","slug":"arrival-7-slim-fit-training-shorts-graphite-grey","image":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"arrival-7-slim-fit-training-shorts-graphite-grey-black","image":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"arrival-7-slim-fit-training-shorts-graphite-grey-charcoal","image":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","fallback":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","alt":"Arrival 7\" Slim Fit Training Shorts studio front view"},{"type":"image","url":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","fallback":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","alt":"Arrival 7\" Slim Fit Training Shorts muscle taper profile"},{"type":"image","url":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","fallback":"/media/products/catalog/arrival-7-slim-fit-training-shorts-graphite-grey.webp","alt":"Arrival 7\" Slim Fit Training Shorts movement rear view"}]'::jsonb, 'The shorts that handle any workout thrown at them. Lightweight sweat-wicking poly-elastane blend with an elastic drawstring waistband and two deep side pockets.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Breathable Lightweight Gym Shorts"}'::jsonb,
  4.6, 130, '{"1":0,"2":1,"3":3,"4":18,"5":106}'::jsonb, '{}'::text[]
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'Legacy Heavyweight Graphic T-Shirt', 'Distressed Vintage Archival Print',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Legacy Archive', 36, NULL,
  '/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp', 'New', ARRAY['VINTAGE WASH', 'HEAVYWEIGHT']::text[], 'Dark Olive Green', '#3B4D3C',
  '[{"name":"Dark Olive Green","hex":"#3B4D3C","slug":"legacy-heavyweight-graphic-t-shirt-dark-olive-green","image":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"legacy-heavyweight-graphic-t-shirt-dark-olive-green-black","image":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"legacy-heavyweight-graphic-t-shirt-dark-olive-green-charcoal","image":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","alt":"Legacy Heavyweight Graphic T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","alt":"Legacy Heavyweight Graphic T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-graphic-t-shirt-dark-olive-green.webp","alt":"Legacy Heavyweight Graphic T-Shirt movement rear view"}]'::jsonb, 'Inspired by the garage gym roots. Mineral-washed heavyweight cotton tee featuring the original Gymshark lifting logo printed with distressed, crackled inks.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Distressed Vintage Archival Print"}'::jsonb,
  4.9, 153, '{"1":0,"2":1,"3":4,"4":21,"5":125}'::jsonb, '{}'::text[]
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'Geo Seamless Muscle Fit T-Shirt', 'Body-Mapping Compression Jacquard',
  'men', 'm', 't-shirts', ARRAY['running', 'weight-lifting']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'geo-seamless', 'Geo Seamless', 42, NULL,
  '/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp', 'Trending', ARRAY['SEAMLESS JACQUARD', 'MUSCLE FIT']::text[], 'Slate Grey', '#525B62',
  '[{"name":"Slate Grey","hex":"#525B62","slug":"geo-seamless-muscle-fit-t-shirt-slate-grey","image":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"geo-seamless-muscle-fit-t-shirt-slate-grey-black","image":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"geo-seamless-muscle-fit-t-shirt-slate-grey-charcoal","image":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","fallback":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","alt":"Geo Seamless Muscle Fit T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","fallback":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","alt":"Geo Seamless Muscle Fit T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","fallback":"/media/products/catalog/geo-seamless-muscle-fit-t-shirt-slate-grey.webp","alt":"Geo Seamless Muscle Fit T-Shirt movement rear view"}]'::jsonb, 'Hugs the delts, chest, and arms while tapering sharply at the waist. Geometric breathability knit patterns follow muscle groups to dump heat efficiently.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Body-Mapping Compression Jacquard"}'::jsonb,
  4.8, 176, '{"1":0,"2":1,"3":5,"4":24,"5":144}'::jsonb, '{}'::text[]
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black', 'sport-seamless-full-zip-track-jacket-pitch-black', 'Sport Seamless Full-Zip Track Jacket', 'Athletic Fitted High Collar Jacket',
  'men', 'm', 'jackets', ARRAY['running', 'athleisure', 'hiking']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['sweat-wicking', 'reflective', 'pockets', 'four-way-stretch']::text[],
  'vital', 'Sport Performance', 65, 78,
  '/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp', 'Sale', ARRAY['FULL-ZIP', 'REFLECTIVE DETAILS']::text[], 'Pitch Black', '#141416',
  '[{"name":"Pitch Black","hex":"#141416","slug":"sport-seamless-full-zip-track-jacket-pitch-black","image":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"sport-seamless-full-zip-track-jacket-pitch-black-black","image":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"sport-seamless-full-zip-track-jacket-pitch-black-charcoal","image":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","fallback":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","alt":"Sport Seamless Full-Zip Track Jacket studio front view"},{"type":"image","url":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","fallback":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","alt":"Sport Seamless Full-Zip Track Jacket muscle taper profile"},{"type":"image","url":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","fallback":"/media/products/catalog/sport-seamless-full-zip-track-jacket-pitch-black.webp","alt":"Sport Seamless Full-Zip Track Jacket movement rear view"}]'::jsonb, 'Clean athletic silhouette. Seamless engineered knit offers high flexibility with zero chafing seams, dual concealed zipper pockets, and reflective arm details.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Athletic Fitted High Collar Jacket"}'::jsonb,
  4.7, 199, '{"1":0,"2":1,"3":5,"4":27,"5":163}'::jsonb, '{}'::text[]
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal', 'power-heavyweight-lifting-joggers-washed-charcoal', 'Power Heavyweight Lifting Joggers', 'Tapered Cuffed Barbell Sweatpants',
  'men', 'm', 'joggers', ARRAY['weight-lifting', 'athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Power', 52, NULL,
  '/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp', 'Bestseller', ARRAY['REINFORCED KNEES', 'ZIP POCKETS']::text[], 'Washed Charcoal', '#2F3136',
  '[{"name":"Washed Charcoal","hex":"#2F3136","slug":"power-heavyweight-lifting-joggers-washed-charcoal","image":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"power-heavyweight-lifting-joggers-washed-charcoal-black","image":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"power-heavyweight-lifting-joggers-washed-charcoal-charcoal","image":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","fallback":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","alt":"Power Heavyweight Lifting Joggers studio front view"},{"type":"image","url":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","fallback":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","alt":"Power Heavyweight Lifting Joggers muscle taper profile"},{"type":"image","url":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","fallback":"/media/products/catalog/power-heavyweight-lifting-joggers-washed-charcoal.webp","alt":"Power Heavyweight Lifting Joggers movement rear view"}]'::jsonb, 'Built for the iron paradise. Gusseted crotch and room in the quads that tapers into a snug ribbed ankle cuff that stays clear of barbell knurling.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Tapered Cuffed Barbell Sweatpants"}'::jsonb,
  4.6, 42, '{"1":0,"2":1,"3":1,"4":5,"5":34}'::jsonb, '{}'::text[]
),
(
  'arrival-slim-fit-performance-tank-pure-white', 'arrival-slim-fit-performance-tank-pure-white', 'Arrival Slim Fit Performance Tank', 'Featherweight Breathable Gym Tank',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'running']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'everyday-seamless', 'Arrival Series', 24, NULL,
  '/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp', NULL, ARRAY['QUICK DRY', 'LIGHTWEIGHT']::text[], 'Pure White', '#FFFFFF',
  '[{"name":"Pure White","hex":"#FFFFFF","slug":"arrival-slim-fit-performance-tank-pure-white","image":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"arrival-slim-fit-performance-tank-pure-white-black","image":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"arrival-slim-fit-performance-tank-pure-white-charcoal","image":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","fallback":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","alt":"Arrival Slim Fit Performance Tank studio front view"},{"type":"image","url":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","fallback":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","alt":"Arrival Slim Fit Performance Tank muscle taper profile"},{"type":"image","url":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","fallback":"/media/products/catalog/arrival-slim-fit-performance-tank-pure-white.webp","alt":"Arrival Slim Fit Performance Tank movement rear view"}]'::jsonb, 'Light as air. High-performance polyester with anti-static finish and subtle reflective heat-seal Gymshark sharkhead logo.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Featherweight Breathable Gym Tank"}'::jsonb,
  4.9, 65, '{"1":0,"2":1,"3":1,"4":9,"5":53}'::jsonb, '{}'::text[]
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'Apex Breathable Seamless Long Sleeve Top', 'Targeted Laser-Cut Mesh Zones',
  'men', 'm', 't-shirts', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch', 'reflective']::text[],
  'vital', 'Apex Performance', 48, NULL,
  '/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp', 'New', ARRAY['LASER PERFORATED', 'THUMBHOLES']::text[], 'Reflective Silver / Black', '#23272A',
  '[{"name":"Reflective Silver / Black","hex":"#23272A","slug":"apex-breathable-seamless-long-sleeve-top-reflective-silver-black","image":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"apex-breathable-seamless-long-sleeve-top-reflective-silver-black-black","image":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"apex-breathable-seamless-long-sleeve-top-reflective-silver-black-charcoal","image":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","fallback":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","alt":"Apex Breathable Seamless Long Sleeve Top studio front view"},{"type":"image","url":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","fallback":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","alt":"Apex Breathable Seamless Long Sleeve Top muscle taper profile"},{"type":"image","url":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","fallback":"/media/products/catalog/apex-breathable-seamless-long-sleeve-top-reflective-silver-black.webp","alt":"Apex Breathable Seamless Long Sleeve Top movement rear view"}]'::jsonb, 'Next-generation running technical wear. Targeted micro-mesh perforations along the thoracic spine and armpits provide maximum heat dispersal during marathon training.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Targeted Laser-Cut Mesh Zones"}'::jsonb,
  4.8, 88, '{"1":0,"2":1,"3":2,"4":12,"5":72}'::jsonb, '{}'::text[]
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl', 'crest-slim-fit-fleece-sweatpants-black-marl', 'Crest Slim Fit Fleece Sweatpants', 'Everyday Tapered Joggers',
  'men', 'm', 'joggers', ARRAY['athleisure']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Crest Collection', 45, NULL,
  '/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp', 'Bestseller', ARRAY['SLIM TAPER', 'EMBROIDERED LOGO']::text[], 'Black Marl', '#1F1F21',
  '[{"name":"Black Marl","hex":"#1F1F21","slug":"crest-slim-fit-fleece-sweatpants-black-marl","image":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"crest-slim-fit-fleece-sweatpants-black-marl-black","image":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"crest-slim-fit-fleece-sweatpants-black-marl-charcoal","image":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","fallback":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","alt":"Crest Slim Fit Fleece Sweatpants studio front view"},{"type":"image","url":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","fallback":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","alt":"Crest Slim Fit Fleece Sweatpants muscle taper profile"},{"type":"image","url":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","fallback":"/media/products/catalog/crest-slim-fit-fleece-sweatpants-black-marl.webp","alt":"Crest Slim Fit Fleece Sweatpants movement rear view"}]'::jsonb, 'The go-to pants you put on the minute you get home. Tailored slim leg profile that looks sharp enough for coffee runs and casual travel.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Everyday Tapered Joggers"}'::jsonb,
  4.7, 111, '{"1":0,"2":1,"3":3,"4":15,"5":91}'::jsonb, '{}'::text[]
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'Heavyweight Heritage Pump Cover Hoodie', '400gsm Heavy French Terry Pullover',
  'men', 'm', 'hoodies', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch', 'pockets']::text[],
  'power', 'Heritage Power', 68, NULL,
  '/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp', 'Trending', ARRAY['400 GSM', 'HEAVYWEIGHT TERRY']::text[], 'Deep Burgundy', '#581825',
  '[{"name":"Deep Burgundy","hex":"#581825","slug":"heavyweight-heritage-pump-cover-hoodie-deep-burgundy","image":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"heavyweight-heritage-pump-cover-hoodie-deep-burgundy-black","image":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"heavyweight-heritage-pump-cover-hoodie-deep-burgundy-charcoal","image":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","fallback":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","alt":"Heavyweight Heritage Pump Cover Hoodie studio front view"},{"type":"image","url":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","fallback":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","alt":"Heavyweight Heritage Pump Cover Hoodie muscle taper profile"},{"type":"image","url":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","fallback":"/media/products/catalog/heavyweight-heritage-pump-cover-hoodie-deep-burgundy.webp","alt":"Heavyweight Heritage Pump Cover Hoodie movement rear view"}]'::jsonb, 'Maximum density cotton fleece designed to lock in heat until your pump is fully primed. Exaggerated hood fits easily over over-ear lifting headphones.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"400gsm Heavy French Terry Pullover"}'::jsonb,
  4.6, 134, '{"1":0,"2":1,"3":4,"4":18,"5":109}'::jsonb, '{}'::text[]
),
(
  'critical-full-zip-training-hoodie-light-grey-marl', 'critical-full-zip-training-hoodie-light-grey-marl', 'Critical Full-Zip Training Hoodie', 'Versatile Cotton Blend Warm-Up Zip',
  'men', 'm', 'hoodies', ARRAY['weight-lifting', 'athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Critical 2.0', 48, NULL,
  '/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp', NULL, ARRAY['FULL-ZIP', 'ADJUSTABLE HOOD']::text[], 'Light Grey Marl', '#C8CACD',
  '[{"name":"Light Grey Marl","hex":"#C8CACD","slug":"critical-full-zip-training-hoodie-light-grey-marl","image":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"critical-full-zip-training-hoodie-light-grey-marl-black","image":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"critical-full-zip-training-hoodie-light-grey-marl-charcoal","image":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","alt":"Critical Full-Zip Training Hoodie studio front view"},{"type":"image","url":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","alt":"Critical Full-Zip Training Hoodie muscle taper profile"},{"type":"image","url":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","fallback":"/media/products/catalog/critical-full-zip-training-hoodie-light-grey-marl.webp","alt":"Critical Full-Zip Training Hoodie movement rear view"}]'::jsonb, 'Easy layering piece for early mornings. Smooth exterior fabric with a light brushed fleece backing and split kangaroo front pouch.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Versatile Cotton Blend Warm-Up Zip"}'::jsonb,
  4.9, 157, '{"1":0,"2":1,"3":4,"4":21,"5":128}'::jsonb, '{}'::text[]
),
(
  'sport-5-lined-training-shorts-cobalt-blue', 'sport-5-lined-training-shorts-cobalt-blue', 'Sport 5" Lined Training Shorts', 'Built-in Compression Boxer Brief',
  'men', 'm', 'shorts', ARRAY['running', 'weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', 'mid-waisted', ARRAY['pockets', 'sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Sport Performance', 44, NULL,
  '/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp', 'New', ARRAY['5" INSEAM', 'INTERNAL LINER']::text[], 'Cobalt Blue', '#0047AB',
  '[{"name":"Cobalt Blue","hex":"#0047AB","slug":"sport-5-lined-training-shorts-cobalt-blue","image":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"sport-5-lined-training-shorts-cobalt-blue-black","image":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"sport-5-lined-training-shorts-cobalt-blue-charcoal","image":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","fallback":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","alt":"Sport 5\" Lined Training Shorts studio front view"},{"type":"image","url":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","fallback":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","alt":"Sport 5\" Lined Training Shorts muscle taper profile"},{"type":"image","url":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","fallback":"/media/products/catalog/sport-5-lined-training-shorts-cobalt-blue.webp","alt":"Sport 5\" Lined Training Shorts movement rear view"}]'::jsonb, 'Ultimate support without separate compression underwear. Soft anti-odor liner stops inner thigh friction while the outer shell flexes during deep squats.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Built-in Compression Boxer Brief"}'::jsonb,
  4.8, 180, '{"1":0,"2":1,"3":5,"4":25,"5":147}'::jsonb, '{}'::text[]
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white', 'legacy-oversized-boxy-t-shirt-chalk-white', 'Legacy Oversized Boxy T-Shirt', 'Heavy Cotton Drop-Shoulder Tee',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Legacy Archive', 35, NULL,
  '/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp', NULL, ARRAY['BOXY CUT', '100% COTTON']::text[], 'Chalk White', '#F6F6F4',
  '[{"name":"Chalk White","hex":"#F6F6F4","slug":"legacy-oversized-boxy-t-shirt-chalk-white","image":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"legacy-oversized-boxy-t-shirt-chalk-white-black","image":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"legacy-oversized-boxy-t-shirt-chalk-white-charcoal","image":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","alt":"Legacy Oversized Boxy T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","alt":"Legacy Oversized Boxy T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","fallback":"/media/products/catalog/legacy-oversized-boxy-t-shirt-chalk-white.webp","alt":"Legacy Oversized Boxy T-Shirt movement rear view"}]'::jsonb, 'Relaxed streetwear meets serious powerlifting. Wide cut sleeves land just above the elbow for a bold silhouette.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Heavy Cotton Drop-Shoulder Tee"}'::jsonb,
  4.7, 203, '{"1":0,"2":1,"3":6,"4":28,"5":166}'::jsonb, '{}'::text[]
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'Arrival Seamless Short Sleeve T-Shirt', 'Zero-Chafe Lightweight Training Top',
  'men', 'm', 't-shirts', ARRAY['running', 'weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'everyday-seamless', 'Arrival Series', 34, NULL,
  '/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp', NULL, ARRAY['SEAMLESS', 'ANTI-CHAFE']::text[], 'Army Green', '#4B5320',
  '[{"name":"Army Green","hex":"#4B5320","slug":"arrival-seamless-short-sleeve-t-shirt-army-green","image":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"arrival-seamless-short-sleeve-t-shirt-army-green-black","image":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"arrival-seamless-short-sleeve-t-shirt-army-green-charcoal","image":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","fallback":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","alt":"Arrival Seamless Short Sleeve T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","fallback":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","alt":"Arrival Seamless Short Sleeve T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","fallback":"/media/products/catalog/arrival-seamless-short-sleeve-t-shirt-army-green.webp","alt":"Arrival Seamless Short Sleeve T-Shirt movement rear view"}]'::jsonb, 'Engineered without side seams to eradicate skin irritation when you’re pushing through high-rep kettlebell or barbell workouts.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Zero-Chafe Lightweight Training Top"}'::jsonb,
  4.6, 46, '{"1":0,"2":1,"3":1,"4":6,"5":37}'::jsonb, '{}'::text[]
),
(
  'retake-water-repellent-bomber-jacket-olive-drab', 'retake-water-repellent-bomber-jacket-olive-drab', 'Retake Water-Repellent Bomber Jacket', 'Commuter Windbreaker Jacket',
  'men', 'm', 'jackets', ARRAY['athleisure', 'hiking']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', NULL, ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Retake Collection', 75, 90,
  '/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp', 'Sale', ARRAY['DWR COATING', 'ZIP POCKETS']::text[], 'Olive Drab', '#485335',
  '[{"name":"Olive Drab","hex":"#485335","slug":"retake-water-repellent-bomber-jacket-olive-drab","image":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"retake-water-repellent-bomber-jacket-olive-drab-black","image":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"retake-water-repellent-bomber-jacket-olive-drab-charcoal","image":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","fallback":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","alt":"Retake Water-Repellent Bomber Jacket studio front view"},{"type":"image","url":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","fallback":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","alt":"Retake Water-Repellent Bomber Jacket muscle taper profile"},{"type":"image","url":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","fallback":"/media/products/catalog/retake-water-repellent-bomber-jacket-olive-drab.webp","alt":"Retake Water-Repellent Bomber Jacket movement rear view"}]'::jsonb, 'Elevated streetwear aesthetics with training practicality. Ribbed bomber collar, heavy matte black double zipper, and water-repellent shell.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Commuter Windbreaker Jacket"}'::jsonb,
  4.9, 69, '{"1":0,"2":1,"3":2,"4":9,"5":56}'::jsonb, '{}'::text[]
),
(
  'power-ribbed-stringer-vest-onyx-black', 'power-ribbed-stringer-vest-onyx-black', 'Power Ribbed Stringer Vest', 'High Stretch Y-Back Lifting Tank',
  'men', 'm', 't-shirts', ARRAY['weight-lifting']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 26, NULL,
  '/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp', NULL, ARRAY['RIBBED COTTON', 'Y-BACK']::text[], 'Onyx Black', '#101010',
  '[{"name":"Onyx Black","hex":"#101010","slug":"power-ribbed-stringer-vest-onyx-black","image":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"power-ribbed-stringer-vest-onyx-black-black","image":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"power-ribbed-stringer-vest-onyx-black-charcoal","image":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","fallback":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","alt":"Power Ribbed Stringer Vest studio front view"},{"type":"image","url":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","fallback":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","alt":"Power Ribbed Stringer Vest muscle taper profile"},{"type":"image","url":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","fallback":"/media/products/catalog/power-ribbed-stringer-vest-onyx-black.webp","alt":"Power Ribbed Stringer Vest movement rear view"}]'::jsonb, 'Heavy stretch cotton rib knit hugs the chest while the deep cut sides let you flex with complete freedom of movement.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"High Stretch Y-Back Lifting Tank"}'::jsonb,
  4.8, 92, '{"1":0,"2":1,"3":2,"4":12,"5":75}'::jsonb, '{}'::text[]
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'Crest Crew Neck Fleece Sweatshirt', 'Classic Raglan Sleeve Pullover',
  'men', 'm', 'hoodies', ARRAY['athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Crest Collection', 48, NULL,
  '/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp', NULL, ARRAY['RAGLAN SLEEVE', 'CREST LOGO']::text[], 'Heather Oatmeal', '#D5CBBB',
  '[{"name":"Heather Oatmeal","hex":"#D5CBBB","slug":"crest-crew-neck-fleece-sweatshirt-heather-oatmeal","image":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"crest-crew-neck-fleece-sweatshirt-heather-oatmeal-black","image":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"crest-crew-neck-fleece-sweatshirt-heather-oatmeal-charcoal","image":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","fallback":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","alt":"Crest Crew Neck Fleece Sweatshirt studio front view"},{"type":"image","url":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","fallback":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","alt":"Crest Crew Neck Fleece Sweatshirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","fallback":"/media/products/catalog/crest-crew-neck-fleece-sweatshirt-heather-oatmeal.webp","alt":"Crest Crew Neck Fleece Sweatshirt movement rear view"}]'::jsonb, 'Timeless athletic heritage. Raglan sleeve construction allows full shoulder mobility with zero shoulder seam bulk.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Classic Raglan Sleeve Pullover"}'::jsonb,
  4.7, 115, '{"1":0,"2":1,"3":3,"4":16,"5":94}'::jsonb, '{}'::text[]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES
(
  '315-heavyweight-lifting-shorts-5-washed-olive', '315-heavyweight-lifting-shorts-5-washed-olive', '315 Heavyweight Lifting Shorts 5"', 'Raw Hem Barbell Training Shorts',
  'men', 'm', 'shorts', ARRAY['weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'power', '315 Collection', 42, NULL,
  '/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp', 'Trending', ARRAY['5" INSEAM', 'RAW HEM']::text[], 'Washed Olive', '#525B44',
  '[{"name":"Washed Olive","hex":"#525B44","slug":"315-heavyweight-lifting-shorts-5-washed-olive","image":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"315-heavyweight-lifting-shorts-5-washed-olive-black","image":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"315-heavyweight-lifting-shorts-5-washed-olive-charcoal","image":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","fallback":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","alt":"315 Heavyweight Lifting Shorts 5\" studio front view"},{"type":"image","url":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","fallback":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","alt":"315 Heavyweight Lifting Shorts 5\" muscle taper profile"},{"type":"image","url":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","fallback":"/media/products/catalog/315-heavyweight-lifting-shorts-5-washed-olive.webp","alt":"315 Heavyweight Lifting Shorts 5\" movement rear view"}]'::jsonb, 'Named after three 45-pound plates on each side of the bar. Thick French terry with raw edge hems and extra deep zippered phone pockets.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Raw Hem Barbell Training Shorts"}'::jsonb,
  4.6, 138, '{"1":0,"2":1,"3":4,"4":19,"5":113}'::jsonb, '{}'::text[]
),
(
  'apex-running-windbreaker-jacket-midnight-black', 'apex-running-windbreaker-jacket-midnight-black', 'Apex Running Windbreaker Jacket', 'Ultralight Packable Trail Jacket',
  'men', 'm', 'jackets', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['reflective', 'sweat-wicking', 'pockets']::text[],
  'vital', 'Apex Performance', 85, NULL,
  '/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp', 'New', ARRAY['PACKABLE', '360 REFLECTIVE']::text[], 'Midnight Black', '#18191B',
  '[{"name":"Midnight Black","hex":"#18191B","slug":"apex-running-windbreaker-jacket-midnight-black","image":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"apex-running-windbreaker-jacket-midnight-black-black","image":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"apex-running-windbreaker-jacket-midnight-black-charcoal","image":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","fallback":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","alt":"Apex Running Windbreaker Jacket studio front view"},{"type":"image","url":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","fallback":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","alt":"Apex Running Windbreaker Jacket muscle taper profile"},{"type":"image","url":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","fallback":"/media/products/catalog/apex-running-windbreaker-jacket-midnight-black.webp","alt":"Apex Running Windbreaker Jacket movement rear view"}]'::jsonb, 'Weighing under 140 grams, this trail and road windbreaker cuts through head winds and packs neatly into its chest zip pocket.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Ultralight Packable Trail Jacket"}'::jsonb,
  4.9, 161, '{"1":0,"2":1,"3":4,"4":22,"5":132}'::jsonb, '{}'::text[]
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'Sport Muscle Fit Long Sleeve Top', 'Raglan Sleeve Compression Top',
  'men', 'm', 't-shirts', ARRAY['running', 'weight-lifting']::text[],
  'compression', 'Model is 6''1" (185cm) wearing size L in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'vital', 'Sport Performance', 38, NULL,
  '/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp', NULL, ARRAY['COMPRESSION', 'SWEAT WICKING']::text[], 'Crimson Red', '#A31D1D',
  '[{"name":"Crimson Red","hex":"#A31D1D","slug":"sport-muscle-fit-long-sleeve-top-crimson-red","image":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"sport-muscle-fit-long-sleeve-top-crimson-red-black","image":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"sport-muscle-fit-long-sleeve-top-crimson-red-charcoal","image":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","fallback":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","alt":"Sport Muscle Fit Long Sleeve Top studio front view"},{"type":"image","url":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","fallback":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","alt":"Sport Muscle Fit Long Sleeve Top muscle taper profile"},{"type":"image","url":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","fallback":"/media/products/catalog/sport-muscle-fit-long-sleeve-top-crimson-red.webp","alt":"Sport Muscle Fit Long Sleeve Top movement rear view"}]'::jsonb, 'Keeps blood flowing and muscles warm. Ergonomic flatlock seam placement contours around the biceps and pecs.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Raglan Sleeve Compression Top"}'::jsonb,
  4.8, 184, '{"1":0,"2":1,"3":5,"4":25,"5":150}'::jsonb, '{}'::text[]
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'Arrival 2-in-1 Compression Shorts 7"', 'Integrated Phone Pocket Shorts',
  'men', 'm', 'shorts', ARRAY['running', 'weight-lifting']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', 'mid-waisted', ARRAY['pockets', 'sweat-wicking', 'four-way-stretch']::text[],
  'everyday-seamless', 'Arrival Series', 46, NULL,
  '/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp', 'Bestseller', ARRAY['2-IN-1', 'PHONE POCKET']::text[], 'Smoke Grey', '#4E5359',
  '[{"name":"Smoke Grey","hex":"#4E5359","slug":"arrival-2-in-1-compression-shorts-7-smoke-grey","image":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"arrival-2-in-1-compression-shorts-7-smoke-grey-black","image":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"arrival-2-in-1-compression-shorts-7-smoke-grey-charcoal","image":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","fallback":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","alt":"Arrival 2-in-1 Compression Shorts 7\" studio front view"},{"type":"image","url":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","fallback":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","alt":"Arrival 2-in-1 Compression Shorts 7\" muscle taper profile"},{"type":"image","url":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","fallback":"/media/products/catalog/arrival-2-in-1-compression-shorts-7-smoke-grey.webp","alt":"Arrival 2-in-1 Compression Shorts 7\" movement rear view"}]'::jsonb, 'A 7" lightweight shell with an integrated compression under-layer designed with a secure compression phone sleeve on the right thigh.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Integrated Phone Pocket Shorts"}'::jsonb,
  4.7, 207, '{"1":0,"2":1,"3":6,"4":28,"5":169}'::jsonb, '{}'::text[]
),
(
  'legacy-raw-edge-drop-tank-desert-sand', 'legacy-raw-edge-drop-tank-desert-sand', 'Legacy Raw Edge Drop Tank', 'Vintage Washed Armhole Tank',
  'men', 'm', 't-shirts', ARRAY['weight-lifting']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Legacy Archive', 28, NULL,
  '/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp', NULL, ARRAY['RAW EDGE', 'VINTAGE WASH']::text[], 'Desert Sand', '#C5A987',
  '[{"name":"Desert Sand","hex":"#C5A987","slug":"legacy-raw-edge-drop-tank-desert-sand","image":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"legacy-raw-edge-drop-tank-desert-sand-black","image":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"legacy-raw-edge-drop-tank-desert-sand-charcoal","image":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","fallback":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","alt":"Legacy Raw Edge Drop Tank studio front view"},{"type":"image","url":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","fallback":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","alt":"Legacy Raw Edge Drop Tank muscle taper profile"},{"type":"image","url":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","fallback":"/media/products/catalog/legacy-raw-edge-drop-tank-desert-sand.webp","alt":"Legacy Raw Edge Drop Tank movement rear view"}]'::jsonb, 'Raw cut armholes and neckline give this heavy cotton tank an authentic hardcore lifter aesthetic.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Vintage Washed Armhole Tank"}'::jsonb,
  4.6, 50, '{"1":0,"2":1,"3":1,"4":7,"5":41}'::jsonb, '{}'::text[]
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'Critical 2.0 Regular Fit T-Shirt', 'Everyday Gym & Street T-Shirt',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Critical 2.0', 28, NULL,
  '/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp', NULL, ARRAY['COTTON BLEND', 'EVERYDAY']::text[], 'Atlantic Blue', '#1F4E79',
  '[{"name":"Atlantic Blue","hex":"#1F4E79","slug":"critical-2-0-regular-fit-t-shirt-atlantic-blue","image":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"critical-2-0-regular-fit-t-shirt-atlantic-blue-black","image":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"critical-2-0-regular-fit-t-shirt-atlantic-blue-charcoal","image":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","fallback":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","alt":"Critical 2.0 Regular Fit T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","fallback":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","alt":"Critical 2.0 Regular Fit T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","fallback":"/media/products/catalog/critical-2-0-regular-fit-t-shirt-atlantic-blue.webp","alt":"Critical 2.0 Regular Fit T-Shirt movement rear view"}]'::jsonb, 'The standard issue training shirt. Cut with enough taper to show your shape without squeezing your arms.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Everyday Gym & Street T-Shirt"}'::jsonb,
  4.9, 73, '{"1":0,"2":1,"3":2,"4":10,"5":59}'::jsonb, '{}'::text[]
),
(
  'power-cut-off-sleeveless-hoodie-jet-black', 'power-cut-off-sleeveless-hoodie-jet-black', 'Power Cut-Off Sleeveless Hoodie', 'Heavy Cotton French Terry Cut-Off',
  'men', 'm', 'hoodies', ARRAY['weight-lifting']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', NULL, ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Power', 45, NULL,
  '/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp', 'Trending', ARRAY['RAW SLEEVES', 'KANGAROO POCKET']::text[], 'Jet Black', '#161616',
  '[{"name":"Jet Black","hex":"#161616","slug":"power-cut-off-sleeveless-hoodie-jet-black","image":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"power-cut-off-sleeveless-hoodie-jet-black-black","image":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"power-cut-off-sleeveless-hoodie-jet-black-charcoal","image":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","fallback":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","alt":"Power Cut-Off Sleeveless Hoodie studio front view"},{"type":"image","url":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","fallback":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","alt":"Power Cut-Off Sleeveless Hoodie muscle taper profile"},{"type":"image","url":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","fallback":"/media/products/catalog/power-cut-off-sleeveless-hoodie-jet-black.webp","alt":"Power Cut-Off Sleeveless Hoodie movement rear view"}]'::jsonb, 'Keep your core and head warm while giving your arms full freedom to press and row without fabric bunching.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Heavy Cotton French Terry Cut-Off"}'::jsonb,
  4.8, 96, '{"1":0,"2":1,"3":2,"4":13,"5":78}'::jsonb, '{}'::text[]
),
(
  'crest-regular-fit-shorts-7-navy-marl', 'crest-regular-fit-shorts-7-navy-marl', 'Crest Regular Fit Shorts 7"', 'Soft Cotton Fleece Lounge Shorts',
  'men', 'm', 'shorts', ARRAY['athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Crest Collection', 35, NULL,
  '/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp', NULL, ARRAY['COTTON FLEECE', '7" INSEAM']::text[], 'Navy Marl', '#253551',
  '[{"name":"Navy Marl","hex":"#253551","slug":"crest-regular-fit-shorts-7-navy-marl","image":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"crest-regular-fit-shorts-7-navy-marl-black","image":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"crest-regular-fit-shorts-7-navy-marl-charcoal","image":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","fallback":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","alt":"Crest Regular Fit Shorts 7\" studio front view"},{"type":"image","url":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","fallback":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","alt":"Crest Regular Fit Shorts 7\" muscle taper profile"},{"type":"image","url":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","fallback":"/media/products/catalog/crest-regular-fit-shorts-7-navy-marl.webp","alt":"Crest Regular Fit Shorts 7\" movement rear view"}]'::jsonb, 'Relaxed comfort for post-workout protein shakes and weekend errands. Deep pockets hold keys and wallet securely.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Soft Cotton Fleece Lounge Shorts"}'::jsonb,
  4.7, 119, '{"1":0,"2":1,"3":3,"4":16,"5":97}'::jsonb, '{}'::text[]
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'Apex Seamless Short Sleeve Top', 'High Ventilation Running Tee',
  'men', 'm', 't-shirts', ARRAY['running', 'hiking']::text[],
  'slim', 'Model is 6''1" (185cm) wearing size L in slim fit.', NULL, ARRAY['sweat-wicking', 'reflective', 'four-way-stretch']::text[],
  'vital', 'Apex Performance', 44, NULL,
  '/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp', 'New', ARRAY['SEAMLESS', 'MAX BREATHABLE']::text[], 'Cyber Lime / Charcoal', '#99CC00',
  '[{"name":"Cyber Lime / Charcoal","hex":"#99CC00","slug":"apex-seamless-short-sleeve-top-cyber-lime-charcoal","image":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"apex-seamless-short-sleeve-top-cyber-lime-charcoal-black","image":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"apex-seamless-short-sleeve-top-cyber-lime-charcoal-charcoal","image":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","fallback":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","alt":"Apex Seamless Short Sleeve Top studio front view"},{"type":"image","url":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","fallback":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","alt":"Apex Seamless Short Sleeve Top muscle taper profile"},{"type":"image","url":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","fallback":"/media/products/catalog/apex-seamless-short-sleeve-top-cyber-lime-charcoal.webp","alt":"Apex Seamless Short Sleeve Top movement rear view"}]'::jsonb, 'Engineered gradient mesh increases porosity over chest and back sweat points for unmatched cooling.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"High Ventilation Running Tee"}'::jsonb,
  4.6, 142, '{"1":0,"2":1,"3":4,"4":19,"5":116}'::jsonb, '{}'::text[]
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'Heavyweight Oversized Acid Wash Tee', 'Vintage Distressed Boxy T-Shirt',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'athleisure']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Acid Wash', 40, NULL,
  '/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp', 'Trending', ARRAY['ACID WASH', '260 GSM COTTON']::text[], 'Vintage Steel', '#4C5158',
  '[{"name":"Vintage Steel","hex":"#4C5158","slug":"heavyweight-oversized-acid-wash-tee-vintage-steel","image":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"heavyweight-oversized-acid-wash-tee-vintage-steel-black","image":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"heavyweight-oversized-acid-wash-tee-vintage-steel-charcoal","image":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","fallback":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","alt":"Heavyweight Oversized Acid Wash Tee studio front view"},{"type":"image","url":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","fallback":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","alt":"Heavyweight Oversized Acid Wash Tee muscle taper profile"},{"type":"image","url":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","fallback":"/media/products/catalog/heavyweight-oversized-acid-wash-tee-vintage-steel.webp","alt":"Heavyweight Oversized Acid Wash Tee movement rear view"}]'::jsonb, 'Each tee undergoes a specialized acid-wash treatment making every piece unique. Heavy 260gsm jersey cotton.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Vintage Distressed Boxy T-Shirt"}'::jsonb,
  4.9, 165, '{"1":0,"2":1,"3":4,"4":23,"5":135}'::jsonb, '{}'::text[]
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey', 'bold-seamless-long-sleeve-top-charcoal-grey', 'Bold Seamless Long Sleeve Top', 'Sculpting Compression Base Layer',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'running']::text[],
  'compression', 'Model is 6''1" (185cm) wearing size L in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'geo-seamless', 'Bold Seamless', 46, NULL,
  '/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp', NULL, ARRAY['COMPRESSION', 'SEAMLESS']::text[], 'Charcoal Grey', '#3A3A3C',
  '[{"name":"Charcoal Grey","hex":"#3A3A3C","slug":"bold-seamless-long-sleeve-top-charcoal-grey","image":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"bold-seamless-long-sleeve-top-charcoal-grey-black","image":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"bold-seamless-long-sleeve-top-charcoal-grey-charcoal","image":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","fallback":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","alt":"Bold Seamless Long Sleeve Top studio front view"},{"type":"image","url":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","fallback":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","alt":"Bold Seamless Long Sleeve Top muscle taper profile"},{"type":"image","url":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","fallback":"/media/products/catalog/bold-seamless-long-sleeve-top-charcoal-grey.webp","alt":"Bold Seamless Long Sleeve Top movement rear view"}]'::jsonb, 'Firm muscular support that reduces muscle oscillation during sprints and heavy deadlifts.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Sculpting Compression Base Layer"}'::jsonb,
  4.8, 188, '{"1":0,"2":1,"3":5,"4":26,"5":154}'::jsonb, '{}'::text[]
),
(
  'arrival-lightweight-track-jacket-stealth-black', 'arrival-lightweight-track-jacket-stealth-black', 'Arrival Lightweight Track Jacket', 'Full-Zip Mesh Lined Jacket',
  'men', 'm', 'jackets', ARRAY['running', 'athleisure']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['sweat-wicking', 'pockets', 'four-way-stretch']::text[],
  'everyday-seamless', 'Arrival Series', 58, 70,
  '/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp', 'Sale', ARRAY['MESH LINED', 'ZIP POCKETS']::text[], 'Stealth Black', '#1A1A1A',
  '[{"name":"Stealth Black","hex":"#1A1A1A","slug":"arrival-lightweight-track-jacket-stealth-black","image":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"arrival-lightweight-track-jacket-stealth-black-black","image":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"arrival-lightweight-track-jacket-stealth-black-charcoal","image":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","fallback":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","alt":"Arrival Lightweight Track Jacket studio front view"},{"type":"image","url":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","fallback":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","alt":"Arrival Lightweight Track Jacket muscle taper profile"},{"type":"image","url":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","fallback":"/media/products/catalog/arrival-lightweight-track-jacket-stealth-black.webp","alt":"Arrival Lightweight Track Jacket movement rear view"}]'::jsonb, 'Crisp woven shell with breathable mesh interior lining. Raglan cut shoulders make warm-ups and throwing punches fluid.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Full-Zip Mesh Lined Jacket"}'::jsonb,
  4.7, 211, '{"1":0,"2":1,"3":6,"4":29,"5":173}'::jsonb, '{}'::text[]
),
(
  'sport-7-unlined-training-shorts-rust-orange', 'sport-7-unlined-training-shorts-rust-orange', 'Sport 7" Unlined Training Shorts', 'Lightweight Four-Way Stretch Shorts',
  'men', 'm', 'shorts', ARRAY['running', 'weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', 'mid-waisted', ARRAY['sweat-wicking', 'four-way-stretch', 'pockets']::text[],
  'vital', 'Sport Performance', 36, NULL,
  '/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp', NULL, ARRAY['7" INSEAM', '4-WAY STRETCH']::text[], 'Rust Orange', '#C04000',
  '[{"name":"Rust Orange","hex":"#C04000","slug":"sport-7-unlined-training-shorts-rust-orange","image":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"sport-7-unlined-training-shorts-rust-orange-black","image":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"sport-7-unlined-training-shorts-rust-orange-charcoal","image":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","fallback":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","alt":"Sport 7\" Unlined Training Shorts studio front view"},{"type":"image","url":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","fallback":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","alt":"Sport 7\" Unlined Training Shorts muscle taper profile"},{"type":"image","url":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","fallback":"/media/products/catalog/sport-7-unlined-training-shorts-rust-orange.webp","alt":"Sport 7\" Unlined Training Shorts movement rear view"}]'::jsonb, 'Unlined construction leaves base-layer selection completely up to you. Breathable micro-stretch fabric.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Lightweight Four-Way Stretch Shorts"}'::jsonb,
  4.6, 54, '{"1":0,"2":1,"3":1,"4":7,"5":44}'::jsonb, '{}'::text[]
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'Legacy Heavyweight Fleece Joggers', 'Barbell Friendly French Terry Joggers',
  'men', 'm', 'joggers', ARRAY['weight-lifting', 'athleisure']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'power', 'Legacy Archive', 56, NULL,
  '/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp', 'New', ARRAY['HEAVY FLEECE', 'ARCHIVE EMBROIDERY']::text[], 'Dark Forest Green', '#223824',
  '[{"name":"Dark Forest Green","hex":"#223824","slug":"legacy-heavyweight-fleece-joggers-dark-forest-green","image":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"legacy-heavyweight-fleece-joggers-dark-forest-green-black","image":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"legacy-heavyweight-fleece-joggers-dark-forest-green-charcoal","image":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","alt":"Legacy Heavyweight Fleece Joggers studio front view"},{"type":"image","url":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","alt":"Legacy Heavyweight Fleece Joggers muscle taper profile"},{"type":"image","url":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","fallback":"/media/products/catalog/legacy-heavyweight-fleece-joggers-dark-forest-green.webp","alt":"Legacy Heavyweight Fleece Joggers movement rear view"}]'::jsonb, 'Old-school collegiate fit. Thick ribbed waistband with heavy cotton drawcords and elasticated cuffs.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Barbell Friendly French Terry Joggers"}'::jsonb,
  4.9, 77, '{"1":0,"2":1,"3":2,"4":10,"5":63}'::jsonb, '{}'::text[]
),
(
  'geo-seamless-compression-tank-top-ice-blue', 'geo-seamless-compression-tank-top-ice-blue', 'Geo Seamless Compression Tank Top', 'Breathable Y-Back Gym Tank',
  'men', 'm', 't-shirts', ARRAY['weight-lifting']::text[],
  'compression', 'Model is 6''1" (185cm) wearing size L in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'geo-seamless', 'Geo Seamless', 32, NULL,
  '/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp', NULL, ARRAY['SEAMLESS', 'SWEAT REPELLING']::text[], 'Ice Blue', '#7BA4C4',
  '[{"name":"Ice Blue","hex":"#7BA4C4","slug":"geo-seamless-compression-tank-top-ice-blue","image":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"geo-seamless-compression-tank-top-ice-blue-black","image":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"geo-seamless-compression-tank-top-ice-blue-charcoal","image":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","fallback":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","alt":"Geo Seamless Compression Tank Top studio front view"},{"type":"image","url":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","fallback":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","alt":"Geo Seamless Compression Tank Top muscle taper profile"},{"type":"image","url":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","fallback":"/media/products/catalog/geo-seamless-compression-tank-top-ice-blue.webp","alt":"Geo Seamless Compression Tank Top movement rear view"}]'::jsonb, 'Engineered rib knit locks around the torso without restricting rib cage expansion on max effort lifts.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Breathable Y-Back Gym Tank"}'::jsonb,
  4.8, 100, '{"1":0,"2":1,"3":3,"4":14,"5":82}'::jsonb, '{}'::text[]
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'Power Heavyweight Warm-Up Pullover', 'Mock Neck Thermal Training Top',
  'men', 'm', 'hoodies', ARRAY['weight-lifting']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Power', 60, NULL,
  '/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp', NULL, ARRAY['MOCK NECK', 'THERMAL WARMTH']::text[], 'Washed Earth Brown', '#4A3B32',
  '[{"name":"Washed Earth Brown","hex":"#4A3B32","slug":"power-heavyweight-warm-up-pullover-washed-earth-brown","image":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"power-heavyweight-warm-up-pullover-washed-earth-brown-black","image":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"power-heavyweight-warm-up-pullover-washed-earth-brown-charcoal","image":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","fallback":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","alt":"Power Heavyweight Warm-Up Pullover studio front view"},{"type":"image","url":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","fallback":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","alt":"Power Heavyweight Warm-Up Pullover muscle taper profile"},{"type":"image","url":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","fallback":"/media/products/catalog/power-heavyweight-warm-up-pullover-washed-earth-brown.webp","alt":"Power Heavyweight Warm-Up Pullover movement rear view"}]'::jsonb, 'High mock collar keeps heat trapped around the neck and traps during frigid garage gym winters.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Mock Neck Thermal Training Top"}'::jsonb,
  4.7, 123, '{"1":0,"2":1,"3":3,"4":17,"5":100}'::jsonb, '{}'::text[]
),
(
  'sport-breathable-performance-t-shirt-optic-white', 'sport-breathable-performance-t-shirt-optic-white', 'Sport Breathable Performance T-Shirt', 'Ultralight Running & HIIT Tee',
  'men', 'm', 't-shirts', ARRAY['running', 'hiking']::text[],
  'regular', 'Model is 6''1" (185cm) wearing size L in regular fit.', NULL, ARRAY['sweat-wicking', 'reflective', 'four-way-stretch']::text[],
  'vital', 'Sport Performance', 32, NULL,
  '/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp', NULL, ARRAY['REFLECTIVE', 'FAST DRYING']::text[], 'Optic White', '#FFFFFF',
  '[{"name":"Optic White","hex":"#FFFFFF","slug":"sport-breathable-performance-t-shirt-optic-white","image":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"sport-breathable-performance-t-shirt-optic-white-black","image":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"sport-breathable-performance-t-shirt-optic-white-charcoal","image":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","fallback":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","alt":"Sport Breathable Performance T-Shirt studio front view"},{"type":"image","url":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","fallback":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","alt":"Sport Breathable Performance T-Shirt muscle taper profile"},{"type":"image","url":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","fallback":"/media/products/catalog/sport-breathable-performance-t-shirt-optic-white.webp","alt":"Sport Breathable Performance T-Shirt movement rear view"}]'::jsonb, 'Stay seen and dry. Laser cut underarm vents and micro-flatlock seams that never irritate.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Ultralight Running & HIIT Tee"}'::jsonb,
  4.6, 146, '{"1":0,"2":1,"3":4,"4":20,"5":119}'::jsonb, '{}'::text[]
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'Essential Relaxed Fit Cargo Joggers', 'Multi-Pocket Technical Pants',
  'men', 'm', 'joggers', ARRAY['athleisure', 'hiking']::text[],
  'relaxed', 'Model is 6''1" (185cm) wearing size L in relaxed fit.', 'mid-waisted', ARRAY['pockets', 'four-way-stretch']::text[],
  'everyday-seamless', 'Everyday Essentials', 62, NULL,
  '/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp', 'Trending', ARRAY['CARGO POCKETS', 'STRETCH TWILL']::text[], 'Stealth Black', '#1A1A1A',
  '[{"name":"Stealth Black","hex":"#1A1A1A","slug":"essential-relaxed-fit-cargo-joggers-stealth-black","image":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"essential-relaxed-fit-cargo-joggers-stealth-black-black","image":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"essential-relaxed-fit-cargo-joggers-stealth-black-charcoal","image":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","fallback":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","alt":"Essential Relaxed Fit Cargo Joggers studio front view"},{"type":"image","url":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","fallback":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","alt":"Essential Relaxed Fit Cargo Joggers muscle taper profile"},{"type":"image","url":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","fallback":"/media/products/catalog/essential-relaxed-fit-cargo-joggers-stealth-black.webp","alt":"Essential Relaxed Fit Cargo Joggers movement rear view"}]'::jsonb, 'Dual low-profile cargo flap pockets and articulated knee darts give you rugged utility for hiking trails and city days.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Multi-Pocket Technical Pants"}'::jsonb,
  4.9, 169, '{"1":0,"2":1,"3":5,"4":23,"5":138}'::jsonb, '{}'::text[]
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy', 'critical-short-sleeve-compression-baselayer-dark-navy', 'Critical Short Sleeve Compression Baselayer', 'Second-Skin Muscle Lock Top',
  'men', 'm', 't-shirts', ARRAY['weight-lifting', 'running']::text[],
  'compression', 'Model is 6''1" (185cm) wearing size L in compression fit.', NULL, ARRAY['sweat-wicking', 'four-way-stretch']::text[],
  'power', 'Critical 2.0', 30, NULL,
  '/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp', NULL, ARRAY['COMPRESSION', 'FLATLOCK SEAMS']::text[], 'Dark Navy', '#14213D',
  '[{"name":"Dark Navy","hex":"#14213D","slug":"critical-short-sleeve-compression-baselayer-dark-navy","image":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"critical-short-sleeve-compression-baselayer-dark-navy-black","image":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"critical-short-sleeve-compression-baselayer-dark-navy-charcoal","image":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","fallback":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","alt":"Critical Short Sleeve Compression Baselayer studio front view"},{"type":"image","url":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","fallback":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","alt":"Critical Short Sleeve Compression Baselayer muscle taper profile"},{"type":"image","url":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","fallback":"/media/products/catalog/critical-short-sleeve-compression-baselayer-dark-navy.webp","alt":"Critical Short Sleeve Compression Baselayer movement rear view"}]'::jsonb, 'Tight compression hold promotes venous return and reduces post-workout muscle soreness.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Second-Skin Muscle Lock Top"}'::jsonb,
  4.8, 192, '{"1":0,"2":1,"3":5,"4":26,"5":157}'::jsonb, '{}'::text[]
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'Heritage Gymshark Barbell Club Tee', 'Archival Heavy Weightlifting Graphic',
  'men', 'm', 't-shirts', ARRAY['weight-lifting']::text[],
  'oversized', 'Model is 6''1" (185cm) wearing size L in oversized fit.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Barbell Club', 36, NULL,
  '/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp', 'New', ARRAY['BARBELL CLUB', 'ORGANIC COTTON']::text[], 'Washed Maroon', '#661D2B',
  '[{"name":"Washed Maroon","hex":"#661D2B","slug":"heritage-gymshark-barbell-club-tee-washed-maroon","image":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","isCurrent":true},{"name":"Pitch Black","hex":"#111111","slug":"heritage-gymshark-barbell-club-tee-washed-maroon-black","image":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","isCurrent":false},{"name":"Charcoal Grey","hex":"#404040","slug":"heritage-gymshark-barbell-club-tee-washed-maroon-charcoal","image":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","fallback":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","alt":"Heritage Gymshark Barbell Club Tee studio front view"},{"type":"image","url":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","fallback":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","alt":"Heritage Gymshark Barbell Club Tee muscle taper profile"},{"type":"image","url":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","fallback":"/media/products/catalog/heritage-gymshark-barbell-club-tee-washed-maroon.webp","alt":"Heritage Gymshark Barbell Club Tee movement rear view"}]'::jsonb, 'Commemorating our history of iron. Heavy mineral-washed 240gsm cotton with collegiate Gymshark Barbell Club graphics.', ARRAY['Heavy-duty construction built for compound barbell training', 'Reinforced seams engineered to resist wear and tear', 'Athlete-tested tapered fit highlights physique']::text[],
  '95% Premium Combed Cotton, 5% Elastane (or 100% Breathable Recycled Poly)', ARRAY['Wash with like colors at 30°C', 'Avoid fabric softeners on technical stretch fabrics', 'Air dry away from direct heat']::text[], '{"runsSmall":5,"trueToSize":89,"runsLarge":6,"softnessRating":92,"supportRating":"Archival Heavy Weightlifting Graphic"}'::jsonb,
  4.7, 215, '{"1":0,"2":1,"3":6,"4":30,"5":176}'::jsonb, '{}'::text[]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

INSERT INTO public.products (
  id, slug, name, subtitle, category, gender, type, activities,
  fit, fit_note, rise, features, collection, collection_name,
  price, compare_at_price, image, tag, badges, color, color_hex,
  colorways, gallery, description, highlights, materials, care_instructions,
  fit_feedback, rating, review_count, rating_breakdown, complete_the_look_ids
) VALUES
(
  'heavy-duty-padded-lifting-straps-pair-stealth-black', 'heavy-duty-padded-lifting-straps-pair-stealth-black', 'Heavy Duty Padded Lifting Straps (Pair)', 'Neoprene Padded Barbell Straps',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Lifting Accessories', 18, NULL,
  '/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp', 'Bestseller', ARRAY['NEOPRENE PADDED', 'HEAVY DUTY']::text[], 'Stealth Black', '#111111',
  '[{"name":"Stealth Black","hex":"#111111","slug":"heavy-duty-padded-lifting-straps-pair-stealth-black","image":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"heavy-duty-padded-lifting-straps-pair-stealth-black-stealth","image":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","fallback":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","alt":"Heavy Duty Padded Lifting Straps (Pair) hero product shot"},{"type":"image","url":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","fallback":"/media/products/catalog/heavy-duty-padded-lifting-straps-pair-stealth-black.webp","alt":"Heavy Duty Padded Lifting Straps (Pair) detail craftsmanship"}]'::jsonb, 'Take your grip out of the equation. Heavy-duty woven cotton webbing with 5mm thick neoprene wrist cushioning stops straps from cutting into your wrists on 500lb deadlifts.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 65, '{"1":0,"2":1,"3":1,"4":7,"5":55}'::jsonb, '{}'::text[]
),
(
  'everyday-crew-training-socks-3-pack-white-black-grey', 'everyday-crew-training-socks-3-pack-white-black-grey', 'Everyday Crew Training Socks (3-Pack)', 'Cushioned Arch Support Crew Socks',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'running', 'athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['sweat-wicking']::text[],
  'everyday-seamless', 'Everyday Essentials', 16, NULL,
  '/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp', 'Bestseller', ARRAY['3-PACK', 'CUSHIONED SOLE']::text[], 'White / Black / Grey', '#FFFFFF',
  '[{"name":"White / Black / Grey","hex":"#FFFFFF","slug":"everyday-crew-training-socks-3-pack-white-black-grey","image":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"everyday-crew-training-socks-3-pack-white-black-grey-stealth","image":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","fallback":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","alt":"Everyday Crew Training Socks (3-Pack) hero product shot"},{"type":"image","url":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","fallback":"/media/products/catalog/everyday-crew-training-socks-3-pack-white-black-grey.webp","alt":"Everyday Crew Training Socks (3-Pack) detail craftsmanship"}]'::jsonb, 'Thick terry cushioning along the heel and forefoot protects against high impacts. Ribbed calf hold prevents socks from sliding down your leg.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 96, '{"1":0,"2":1,"3":1,"4":11,"5":81}'::jsonb, '{}'::text[]
),
(
  'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black', 'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black', 'Stainless Steel Insulated Shaker Bottle 750ml', 'Double-Wall Vacuum Sealed Shaker',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Gym Essentials', 28, NULL,
  '/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp', 'Trending', ARRAY['ODOR RESISTANT', '24HR COLD']::text[], 'Matte Stealth Black', '#1B1B1B',
  '[{"name":"Matte Stealth Black","hex":"#1B1B1B","slug":"stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black","image":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black-stealth","image":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","fallback":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","alt":"Stainless Steel Insulated Shaker Bottle 750ml hero product shot"},{"type":"image","url":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","fallback":"/media/products/catalog/stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black.webp","alt":"Stainless Steel Insulated Shaker Bottle 750ml detail craftsmanship"}]'::jsonb, 'Say goodbye to smelly plastic shakers. Surgical grade 18/8 stainless steel keeps protein shakes ice cold for 24 hours with a leak-proof twist lock cap and silent mixing grid.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 127, '{"1":0,"2":1,"3":2,"4":15,"5":107}'::jsonb, '{}'::text[]
),
(
  'everyday-gym-duffle-bag-35l-jet-black', 'everyday-gym-duffle-bag-35l-jet-black', 'Everyday Gym Duffle Bag 35L', 'Dedicated Shoe Tunnel & Wet Pocket',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['pockets']::text[],
  'everyday-seamless', 'Bags & Packs', 45, NULL,
  '/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp', 'Bestseller', ARRAY['35L CAPACITY', 'SHOE COMPARTMENT']::text[], 'Jet Black', '#151515',
  '[{"name":"Jet Black","hex":"#151515","slug":"everyday-gym-duffle-bag-35l-jet-black","image":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"everyday-gym-duffle-bag-35l-jet-black-stealth","image":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","fallback":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","alt":"Everyday Gym Duffle Bag 35L hero product shot"},{"type":"image","url":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","fallback":"/media/products/catalog/everyday-gym-duffle-bag-35l-jet-black.webp","alt":"Everyday Gym Duffle Bag 35L detail craftsmanship"}]'::jsonb, 'Engineered for gym commuters. Heavy duty water-resistant base, ventilated side shoe compartment that fits up to size 13 lifting shoes, and padded shoulder strap.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 158, '{"1":0,"2":1,"3":3,"4":18,"5":134}'::jsonb, '{}'::text[]
),
(
  'resistance-loop-band-set-3-pack-tonal-pink-grey', 'resistance-loop-band-set-3-pack-tonal-pink-grey', 'Resistance Loop Band Set (3-Pack)', 'Light, Medium & Heavy Latex Bands',
  'accessories', 'u', 'accessories', ARRAY['pilates', 'yoga', 'weight-lifting']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'everyday-seamless', 'Mobility & Recovery', 20, NULL,
  '/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp', NULL, ARRAY['3 RESISTANCE LEVELS', 'CARRY POUCH']::text[], 'Tonal Pink & Grey', '#D6A2B8',
  '[{"name":"Tonal Pink & Grey","hex":"#D6A2B8","slug":"resistance-loop-band-set-3-pack-tonal-pink-grey","image":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"resistance-loop-band-set-3-pack-tonal-pink-grey-stealth","image":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","fallback":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","alt":"Resistance Loop Band Set (3-Pack) hero product shot"},{"type":"image","url":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","fallback":"/media/products/catalog/resistance-loop-band-set-3-pack-tonal-pink-grey.webp","alt":"Resistance Loop Band Set (3-Pack) detail craftsmanship"}]'::jsonb, 'Perfect for glute warmups, rotator cuff prehab, and mobility work. Includes breathable mesh carrying travel pouch.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 189, '{"1":0,"2":1,"3":3,"4":22,"5":160}'::jsonb, '{}'::text[]
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather', '10mm-leather-weightlifting-belt-matte-black-leather', '10mm Leather Weightlifting Belt', 'Steel Quick-Release Lever Buckle',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Powerlifting Core', 85, 100,
  '/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp', 'Sale', ARRAY['IPF LEGAL SPEC', 'STEEL LEVER']::text[], 'Matte Black Leather', '#1A1A1A',
  '[{"name":"Matte Black Leather","hex":"#1A1A1A","slug":"10mm-leather-weightlifting-belt-matte-black-leather","image":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"10mm-leather-weightlifting-belt-matte-black-leather-stealth","image":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","fallback":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","alt":"10mm Leather Weightlifting Belt hero product shot"},{"type":"image","url":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","fallback":"/media/products/catalog/10mm-leather-weightlifting-belt-matte-black-leather.webp","alt":"10mm Leather Weightlifting Belt detail craftsmanship"}]'::jsonb, 'Uncompromising intra-abdominal bracing support. 10mm genuine top-grain cowhide leather with a chrome-plated cast-steel quick release lever.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 220, '{"1":0,"2":1,"3":4,"4":26,"5":187}'::jsonb, '{}'::text[]
),
(
  'legacy-curved-brim-trucker-cap-vintage-black', 'legacy-curved-brim-trucker-cap-vintage-black', 'Legacy Curved Brim Trucker Cap', 'Breathable Mesh Back Snapback',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['sweat-wicking']::text[],
  'power', 'Headwear', 22, NULL,
  '/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp', NULL, ARRAY['SNAPBACK', 'BREATHABLE MESH']::text[], 'Vintage Black', '#222222',
  '[{"name":"Vintage Black","hex":"#222222","slug":"legacy-curved-brim-trucker-cap-vintage-black","image":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"legacy-curved-brim-trucker-cap-vintage-black-stealth","image":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","fallback":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","alt":"Legacy Curved Brim Trucker Cap hero product shot"},{"type":"image","url":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","fallback":"/media/products/catalog/legacy-curved-brim-trucker-cap-vintage-black.webp","alt":"Legacy Curved Brim Trucker Cap detail craftsmanship"}]'::jsonb, 'Classic trucker profile with structured front cotton panel, moisture-absorbing internal sweatband, and adjustable snapback closure.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 251, '{"1":0,"2":1,"3":5,"4":30,"5":213}'::jsonb, '{}'::text[]
),
(
  'ribbed-knit-slouch-beanie-heather-grey', 'ribbed-knit-slouch-beanie-heather-grey', 'Ribbed Knit Slouch Beanie', 'Warm Acrylic Ribbed Winter Beanie',
  'accessories', 'u', 'accessories', ARRAY['athleisure', 'hiking']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'everyday-seamless', 'Headwear', 18, NULL,
  '/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp', NULL, ARRAY['RIBBED KNIT', 'TONAL LOGO']::text[], 'Heather Grey', '#8E8E93',
  '[{"name":"Heather Grey","hex":"#8E8E93","slug":"ribbed-knit-slouch-beanie-heather-grey","image":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"ribbed-knit-slouch-beanie-heather-grey-stealth","image":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","fallback":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","alt":"Ribbed Knit Slouch Beanie hero product shot"},{"type":"image","url":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","fallback":"/media/products/catalog/ribbed-knit-slouch-beanie-heather-grey.webp","alt":"Ribbed Knit Slouch Beanie detail craftsmanship"}]'::jsonb, 'Cozy warmth for chilly outdoor workouts and rest days. Subtle silicone Gymshark logo badge folded on the brim.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 282, '{"1":0,"2":1,"3":5,"4":33,"5":239}'::jsonb, '{}'::text[]
),
(
  'gymshark-liquid-chalk-250ml-chalk-white', 'gymshark-liquid-chalk-250ml-chalk-white', 'Gymshark Liquid Chalk 250ml', 'Fast-Drying Dust-Free Grip Formula',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'hiking']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Lifting Accessories', 14, NULL,
  '/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp', 'Bestseller', ARRAY['MESS FREE', 'FAST DRYING']::text[], 'Chalk White', '#FFFFFF',
  '[{"name":"Chalk White","hex":"#FFFFFF","slug":"gymshark-liquid-chalk-250ml-chalk-white","image":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"gymshark-liquid-chalk-250ml-chalk-white-stealth","image":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","fallback":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","alt":"Gymshark Liquid Chalk 250ml hero product shot"},{"type":"image","url":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","fallback":"/media/products/catalog/gymshark-liquid-chalk-250ml-chalk-white.webp","alt":"Gymshark Liquid Chalk 250ml detail craftsmanship"}]'::jsonb, 'Maximum barbell friction without the powdery mess. Pure magnesium carbonate liquid base dries within 15 seconds to form an impenetrable sweat barrier.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 313, '{"1":0,"2":1,"3":6,"4":37,"5":266}'::jsonb, '{}'::text[]
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white', '7mm-neoprene-knee-sleeves-pair-stealth-black-white', '7mm Neoprene Knee Sleeves (Pair)', 'Ergonomic Compression Powerlifting Sleeves',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['four-way-stretch']::text[],
  'power', 'Powerlifting Core', 60, NULL,
  '/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp', 'Trending', ARRAY['7MM THICKNESS', 'ERGONOMIC STITCH']::text[], 'Stealth Black / White', '#181818',
  '[{"name":"Stealth Black / White","hex":"#181818","slug":"7mm-neoprene-knee-sleeves-pair-stealth-black-white","image":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"7mm-neoprene-knee-sleeves-pair-stealth-black-white-stealth","image":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","fallback":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","alt":"7mm Neoprene Knee Sleeves (Pair) hero product shot"},{"type":"image","url":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","fallback":"/media/products/catalog/7mm-neoprene-knee-sleeves-pair-stealth-black-white.webp","alt":"7mm Neoprene Knee Sleeves (Pair) detail craftsmanship"}]'::jsonb, 'High joint compression and rebound warmth for heavy squats and clean-and-jerks. Reinforced quad-stitch seams resist blowout.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 94, '{"1":0,"2":1,"3":1,"4":11,"5":79}'::jsonb, '{}'::text[]
),
(
  'heavy-duty-elastic-wrist-wraps-pair-black-red-line', 'heavy-duty-elastic-wrist-wraps-pair-black-red-line', 'Heavy Duty Elastic Wrist Wraps (Pair)', 'Thumb Loop Barbell Pressing Wraps',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Lifting Accessories', 20, NULL,
  '/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp', NULL, ARRAY['18" LENGTH', 'HOOK & LOOP']::text[], 'Black / Red Line', '#1F1F1F',
  '[{"name":"Black / Red Line","hex":"#1F1F1F","slug":"heavy-duty-elastic-wrist-wraps-pair-black-red-line","image":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"heavy-duty-elastic-wrist-wraps-pair-black-red-line-stealth","image":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","fallback":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","alt":"Heavy Duty Elastic Wrist Wraps (Pair) hero product shot"},{"type":"image","url":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","fallback":"/media/products/catalog/heavy-duty-elastic-wrist-wraps-pair-black-red-line.webp","alt":"Heavy Duty Elastic Wrist Wraps (Pair) detail craftsmanship"}]'::jsonb, 'Cast-iron wrist rigidity for overhead presses and heavy bench work. Heavy duty rubberized elastane with wide industrial Velcro fastener.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 125, '{"1":0,"2":1,"3":2,"4":15,"5":106}'::jsonb, '{}'::text[]
),
(
  'microfiber-gym-sweat-towel-charcoal-grey', 'microfiber-gym-sweat-towel-charcoal-grey', 'Microfiber Gym Sweat Towel', 'Compact Ultra-Absorbent Quick-Dry Towel',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'running', 'pilates']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['sweat-wicking']::text[],
  'everyday-seamless', 'Gym Essentials', 15, NULL,
  '/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp', NULL, ARRAY['ANTI-BACTERIAL', 'QUICK DRY']::text[], 'Charcoal Grey', '#3A3A3C',
  '[{"name":"Charcoal Grey","hex":"#3A3A3C","slug":"microfiber-gym-sweat-towel-charcoal-grey","image":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"microfiber-gym-sweat-towel-charcoal-grey-stealth","image":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","fallback":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","alt":"Microfiber Gym Sweat Towel hero product shot"},{"type":"image","url":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","fallback":"/media/products/catalog/microfiber-gym-sweat-towel-charcoal-grey.webp","alt":"Microfiber Gym Sweat Towel detail craftsmanship"}]'::jsonb, 'Absorbs 4x its weight in moisture and dries 3x faster than traditional cotton towels. Features a corner zip key pocket and hanging loop.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 156, '{"1":0,"2":1,"3":3,"4":18,"5":132}'::jsonb, '{}'::text[]
),
(
  'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru', 'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru', 'Heavyweight Canvas Shopper Tote 25L', 'Reinforced Shoulder Straps Gym Tote',
  'accessories', 'u', 'accessories', ARRAY['athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['pockets']::text[],
  'everyday-seamless', 'Bags & Packs', 25, NULL,
  '/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp', 'New', ARRAY['100% ORGANIC COTTON', 'INTERNAL ZIP POCKET']::text[], 'Raw Cotton Ecru', '#E8E4DA',
  '[{"name":"Raw Cotton Ecru","hex":"#E8E4DA","slug":"heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru","image":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru-stealth","image":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","fallback":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","alt":"Heavyweight Canvas Shopper Tote 25L hero product shot"},{"type":"image","url":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","fallback":"/media/products/catalog/heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru.webp","alt":"Heavyweight Canvas Shopper Tote 25L detail craftsmanship"}]'::jsonb, 'Built to haul lifting shoes, change of clothes, and groceries. Heavyweight 16oz cotton canvas with reinforced box-stitched handles.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 187, '{"1":0,"2":1,"3":3,"4":22,"5":158}'::jsonb, '{}'::text[]
),
(
  'insulated-half-gallon-water-jug-1-9l-desert-sand', 'insulated-half-gallon-water-jug-1-9l-desert-sand', 'Insulated Half-Gallon Water Jug 1.9L', 'Triple-Layer Vacuum Hydration Jug',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'hiking']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'power', 'Hydration', 38, NULL,
  '/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp', 'Bestseller', ARRAY['1.9L (64 OZ)', 'CARRY HANDLE']::text[], 'Desert Sand', '#C2B280',
  '[{"name":"Desert Sand","hex":"#C2B280","slug":"insulated-half-gallon-water-jug-1-9l-desert-sand","image":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"insulated-half-gallon-water-jug-1-9l-desert-sand-stealth","image":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","fallback":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","alt":"Insulated Half-Gallon Water Jug 1.9L hero product shot"},{"type":"image","url":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","fallback":"/media/products/catalog/insulated-half-gallon-water-jug-1-9l-desert-sand.webp","alt":"Insulated Half-Gallon Water Jug 1.9L detail craftsmanship"}]'::jsonb, 'Never run out of water during marathon 2-hour lifting sessions. Built-in sturdy silicone carry handle and wide spout for easy ice loading.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 218, '{"1":0,"2":1,"3":4,"4":26,"5":185}'::jsonb, '{}'::text[]
),
(
  'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack', 'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack', 'Seamless Non-Slip Hair Headbands (3-Pack)', 'Silicone Grip Line Sport Headbands',
  'accessories', 'u', 'accessories', ARRAY['running', 'pilates', 'yoga']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['sweat-wicking']::text[],
  'everyday-seamless', 'Headwear', 12, NULL,
  '/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp', NULL, ARRAY['SILICONE GRIP', 'SWEAT-WICKING']::text[], 'Multi Neutral Pack', '#8C8C8C',
  '[{"name":"Multi Neutral Pack","hex":"#8C8C8C","slug":"seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack","image":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack-stealth","image":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","fallback":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","alt":"Seamless Non-Slip Hair Headbands (3-Pack) hero product shot"},{"type":"image","url":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","fallback":"/media/products/catalog/seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack.webp","alt":"Seamless Non-Slip Hair Headbands (3-Pack) detail craftsmanship"}]'::jsonb, 'Internal silicone wavy track keeps unruly flyaway hairs out of your eyes during intense cardio and inverted yoga poses.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 249, '{"1":0,"2":1,"3":4,"4":29,"5":211}'::jsonb, '{}'::text[]
),
(
  'heavy-fabric-glute-resistance-band-blush-marl', 'heavy-fabric-glute-resistance-band-blush-marl', 'Heavy Fabric Glute Resistance Band', 'Anti-Slip Woven Hip Band',
  'accessories', 'u', 'accessories', ARRAY['weight-lifting', 'pilates']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'vital', 'Mobility & Recovery', 18, NULL,
  '/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp', 'Bestseller', ARRAY['NO ROLLING', 'HEAVY FABRIC']::text[], 'Blush Marl', '#C89D9C',
  '[{"name":"Blush Marl","hex":"#C89D9C","slug":"heavy-fabric-glute-resistance-band-blush-marl","image":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"heavy-fabric-glute-resistance-band-blush-marl-stealth","image":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","fallback":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","alt":"Heavy Fabric Glute Resistance Band hero product shot"},{"type":"image","url":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","fallback":"/media/products/catalog/heavy-fabric-glute-resistance-band-blush-marl.webp","alt":"Heavy Fabric Glute Resistance Band detail craftsmanship"}]'::jsonb, 'Will never pinch skin or roll up like cheap rubber bands. Woven with rubberized grip threading for intense hip thrust and squat warmups.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 280, '{"1":0,"2":1,"3":5,"4":33,"5":238}'::jsonb, '{}'::text[]
),
(
  'laser-cut-ultralight-performance-running-cap-optic-white-silver', 'laser-cut-ultralight-performance-running-cap-optic-white-silver', 'Laser-Cut Ultralight Performance Running Cap', 'Bungee Adjustable Breathable Cap',
  'accessories', 'u', 'accessories', ARRAY['running', 'hiking']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['reflective', 'sweat-wicking']::text[],
  'vital', 'Apex Performance', 24, NULL,
  '/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp', 'New', ARRAY['FEATHERWEIGHT', 'LASER PERFORATED']::text[], 'Optic White / Silver', '#F0F0F0',
  '[{"name":"Optic White / Silver","hex":"#F0F0F0","slug":"laser-cut-ultralight-performance-running-cap-optic-white-silver","image":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"laser-cut-ultralight-performance-running-cap-optic-white-silver-stealth","image":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","fallback":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","alt":"Laser-Cut Ultralight Performance Running Cap hero product shot"},{"type":"image","url":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","fallback":"/media/products/catalog/laser-cut-ultralight-performance-running-cap-optic-white-silver.webp","alt":"Laser-Cut Ultralight Performance Running Cap detail craftsmanship"}]'::jsonb, 'Constructed from featherweight water-repellent ripstop with laser cut cooling holes on both side panels and an adjustable bungee cord at back.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 311, '{"1":0,"2":1,"3":6,"4":37,"5":264}'::jsonb, '{}'::text[]
),
(
  'micro-duffle-crossbody-bag-5l-olive-green', 'micro-duffle-crossbody-bag-5l-olive-green', 'Micro Duffle Crossbody Bag 5L', 'Compact Water-Resistant Crossbody',
  'accessories', 'u', 'accessories', ARRAY['athleisure', 'hiking']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['pockets']::text[],
  'everyday-seamless', 'Bags & Packs', 32, NULL,
  '/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp', 'Trending', ARRAY['COMPACT 5L', 'CROSSBODY STRAP']::text[], 'Olive Green', '#4E5A44',
  '[{"name":"Olive Green","hex":"#4E5A44","slug":"micro-duffle-crossbody-bag-5l-olive-green","image":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"micro-duffle-crossbody-bag-5l-olive-green-stealth","image":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","fallback":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","alt":"Micro Duffle Crossbody Bag 5L hero product shot"},{"type":"image","url":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","fallback":"/media/products/catalog/micro-duffle-crossbody-bag-5l-olive-green.webp","alt":"Micro Duffle Crossbody Bag 5L detail craftsmanship"}]'::jsonb, 'Miniature duffle form factor designed to carry your phone, keys, lifting straps, and wallet with a detachable adjustable jacquard shoulder strap.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.8, 92, '{"1":0,"2":1,"3":1,"4":11,"5":78}'::jsonb, '{}'::text[]
),
(
  'cushioned-ankle-sport-socks-5-pack-triple-white', 'cushioned-ankle-sport-socks-5-pack-triple-white', 'Cushioned Ankle Sport Socks (5-Pack)', 'Low-Cut Anti-Blister Tab Socks',
  'accessories', 'u', 'accessories', ARRAY['running', 'weight-lifting', 'athleisure']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, ARRAY['sweat-wicking']::text[],
  'everyday-seamless', 'Everyday Essentials', 18, NULL,
  '/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp', 'Bestseller', ARRAY['5-PACK', 'ACHILLES TAB']::text[], 'Triple White', '#FFFFFF',
  '[{"name":"Triple White","hex":"#FFFFFF","slug":"cushioned-ankle-sport-socks-5-pack-triple-white","image":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"cushioned-ankle-sport-socks-5-pack-triple-white-stealth","image":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","fallback":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","alt":"Cushioned Ankle Sport Socks (5-Pack) hero product shot"},{"type":"image","url":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","fallback":"/media/products/catalog/cushioned-ankle-sport-socks-5-pack-triple-white.webp","alt":"Cushioned Ankle Sport Socks (5-Pack) detail craftsmanship"}]'::jsonb, 'Engineered with an elevated achilles heel tab to shield against running shoe friction and prevent blistering.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.7, 123, '{"1":0,"2":1,"3":2,"4":14,"5":104}'::jsonb, '{}'::text[]
),
(
  'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones', 'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones', 'No-Pull Elastic Hair Ties (6-Pack)', 'Crease-Free High Hold Scrunchies',
  'accessories', 'u', 'accessories', ARRAY['running', 'weight-lifting', 'yoga']::text[],
  NULL, 'One size fits most athletes or select from standard sizing chart.', NULL, '{}'::text[],
  'everyday-seamless', 'Gym Essentials', 10, NULL,
  '/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp', NULL, ARRAY['6-PACK', 'CREASE FREE']::text[], 'Neutral Earth Tones', '#7C6853',
  '[{"name":"Neutral Earth Tones","hex":"#7C6853","slug":"no-pull-elastic-hair-ties-6-pack-neutral-earth-tones","image":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","isCurrent":true},{"name":"Stealth Black","hex":"#111111","slug":"no-pull-elastic-hair-ties-6-pack-neutral-earth-tones-stealth","image":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","isCurrent":false}]'::jsonb, '[{"type":"image","url":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","fallback":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","alt":"No-Pull Elastic Hair Ties (6-Pack) hero product shot"},{"type":"image","url":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","fallback":"/media/products/catalog/no-pull-elastic-hair-ties-6-pack-neutral-earth-tones.webp","alt":"No-Pull Elastic Hair Ties (6-Pack) detail craftsmanship"}]'::jsonb, 'Super soft seamless microfiber ties hold thick ponytails through intense sprints without pulling or leaving annoying ponytail dents.', ARRAY['Commercial grade materials built for heavy daily gym punishment', 'Designed in collaboration with world-record powerlifters', 'Compact, ergonomic, and gym bag friendly']::text[],
  'Heavy duty woven nylon / surgical grade stainless steel / neoprene', ARRAY['Wipe clean with a damp cloth', 'Air dry in a well-ventilated space', 'Do not submerge leather items in water']::text[], '{"runsSmall":3,"trueToSize":94,"runsLarge":3,"softnessRating":88,"supportRating":"Universal Fit"}'::jsonb,
  4.9, 154, '{"1":0,"2":1,"3":3,"4":18,"5":130}'::jsonb, '{}'::text[]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  image = EXCLUDED.image,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

-- 3. PRODUCT VARIANTS
INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'gymshark-softsense-longline-sports-bra-cherry-red-xs', 'gymshark-softsense-longline-sports-bra-cherry-red', 'XS', 'Cherry Red', 'GS-GYMSHARK-SOFTSENSE-LONGLINE-SPORTS-BRA-CHERRY-RED-XS', 14, NULL
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red-s', 'gymshark-softsense-longline-sports-bra-cherry-red', 'S', 'Cherry Red', 'GS-GYMSHARK-SOFTSENSE-LONGLINE-SPORTS-BRA-CHERRY-RED-S', 22, NULL
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red-m', 'gymshark-softsense-longline-sports-bra-cherry-red', 'M', 'Cherry Red', 'GS-GYMSHARK-SOFTSENSE-LONGLINE-SPORTS-BRA-CHERRY-RED-M', 18, NULL
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red-l', 'gymshark-softsense-longline-sports-bra-cherry-red', 'L', 'Cherry Red', 'GS-GYMSHARK-SOFTSENSE-LONGLINE-SPORTS-BRA-CHERRY-RED-L', 5, NULL
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red-xl', 'gymshark-softsense-longline-sports-bra-cherry-red', 'XL', 'Cherry Red', 'GS-GYMSHARK-SOFTSENSE-LONGLINE-SPORTS-BRA-CHERRY-RED-XL', 2, NULL
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl-xs', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'XS', 'Black Marl', 'GS-VITAL-SEAMLESS-2-0-HIGH-WAISTED-LEGGINGS-BLACK-MARL-XS', 18, NULL
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl-s', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'S', 'Black Marl', 'GS-VITAL-SEAMLESS-2-0-HIGH-WAISTED-LEGGINGS-BLACK-MARL-S', 5, NULL
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl-m', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'M', 'Black Marl', 'GS-VITAL-SEAMLESS-2-0-HIGH-WAISTED-LEGGINGS-BLACK-MARL-M', 2, NULL
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl-l', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'L', 'Black Marl', 'GS-VITAL-SEAMLESS-2-0-HIGH-WAISTED-LEGGINGS-BLACK-MARL-L', 0, NULL
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl-xl', 'vital-seamless-2-0-high-waisted-leggings-black-marl', 'XL', 'Black Marl', 'GS-VITAL-SEAMLESS-2-0-HIGH-WAISTED-LEGGINGS-BLACK-MARL-XL', 11, NULL
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green-xs', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'XS', 'Sage Green', 'GS-EVERYDAY-SEAMLESS-SHORT-SLEEVE-CROP-TOP-SAGE-GREEN-XS', 22, NULL
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green-s', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'S', 'Sage Green', 'GS-EVERYDAY-SEAMLESS-SHORT-SLEEVE-CROP-TOP-SAGE-GREEN-S', 18, NULL
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green-m', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'M', 'Sage Green', 'GS-EVERYDAY-SEAMLESS-SHORT-SLEEVE-CROP-TOP-SAGE-GREEN-M', 5, NULL
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green-l', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'L', 'Sage Green', 'GS-EVERYDAY-SEAMLESS-SHORT-SLEEVE-CROP-TOP-SAGE-GREEN-L', 2, NULL
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green-xl', 'everyday-seamless-short-sleeve-crop-top-sage-green', 'XL', 'Sage Green', 'GS-EVERYDAY-SEAMLESS-SHORT-SLEEVE-CROP-TOP-SAGE-GREEN-XL', 0, NULL
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black-xs', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'XS', 'Washed Black', 'GS-POWER-CROPPED-FULL-ZIP-FLEECE-HOODIE-WASHED-BLACK-XS', 14, NULL
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black-s', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'S', 'Washed Black', 'GS-POWER-CROPPED-FULL-ZIP-FLEECE-HOODIE-WASHED-BLACK-S', 22, NULL
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black-m', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'M', 'Washed Black', 'GS-POWER-CROPPED-FULL-ZIP-FLEECE-HOODIE-WASHED-BLACK-M', 18, NULL
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black-l', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'L', 'Washed Black', 'GS-POWER-CROPPED-FULL-ZIP-FLEECE-HOODIE-WASHED-BLACK-L', 5, NULL
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black-xl', 'power-cropped-full-zip-fleece-hoodie-washed-black', 'XL', 'Washed Black', 'GS-POWER-CROPPED-FULL-ZIP-FLEECE-HOODIE-WASHED-BLACK-XL', 2, NULL
),
(
  'adapt-camo-seamless-5-shorts-berry-pink-xs', 'adapt-camo-seamless-5-shorts-berry-pink', 'XS', 'Berry Pink', 'GS-ADAPT-CAMO-SEAMLESS-5-SHORTS-BERRY-PINK-XS', 2, NULL
),
(
  'adapt-camo-seamless-5-shorts-berry-pink-s', 'adapt-camo-seamless-5-shorts-berry-pink', 'S', 'Berry Pink', 'GS-ADAPT-CAMO-SEAMLESS-5-SHORTS-BERRY-PINK-S', 0, NULL
),
(
  'adapt-camo-seamless-5-shorts-berry-pink-m', 'adapt-camo-seamless-5-shorts-berry-pink', 'M', 'Berry Pink', 'GS-ADAPT-CAMO-SEAMLESS-5-SHORTS-BERRY-PINK-M', 11, NULL
),
(
  'adapt-camo-seamless-5-shorts-berry-pink-l', 'adapt-camo-seamless-5-shorts-berry-pink', 'L', 'Berry Pink', 'GS-ADAPT-CAMO-SEAMLESS-5-SHORTS-BERRY-PINK-L', 14, NULL
),
(
  'adapt-camo-seamless-5-shorts-berry-pink-xl', 'adapt-camo-seamless-5-shorts-berry-pink', 'XL', 'Berry Pink', 'GS-ADAPT-CAMO-SEAMLESS-5-SHORTS-BERRY-PINK-XL', 22, NULL
),
(
  'geo-seamless-high-waisted-leggings-slate-blue-xs', 'geo-seamless-high-waisted-leggings-slate-blue', 'XS', 'Slate Blue', 'GS-GEO-SEAMLESS-HIGH-WAISTED-LEGGINGS-SLATE-BLUE-XS', 5, NULL
),
(
  'geo-seamless-high-waisted-leggings-slate-blue-s', 'geo-seamless-high-waisted-leggings-slate-blue', 'S', 'Slate Blue', 'GS-GEO-SEAMLESS-HIGH-WAISTED-LEGGINGS-SLATE-BLUE-S', 2, NULL
),
(
  'geo-seamless-high-waisted-leggings-slate-blue-m', 'geo-seamless-high-waisted-leggings-slate-blue', 'M', 'Slate Blue', 'GS-GEO-SEAMLESS-HIGH-WAISTED-LEGGINGS-SLATE-BLUE-M', 0, NULL
),
(
  'geo-seamless-high-waisted-leggings-slate-blue-l', 'geo-seamless-high-waisted-leggings-slate-blue', 'L', 'Slate Blue', 'GS-GEO-SEAMLESS-HIGH-WAISTED-LEGGINGS-SLATE-BLUE-L', 11, NULL
),
(
  'geo-seamless-high-waisted-leggings-slate-blue-xl', 'geo-seamless-high-waisted-leggings-slate-blue', 'XL', 'Slate Blue', 'GS-GEO-SEAMLESS-HIGH-WAISTED-LEGGINGS-SLATE-BLUE-XL', 14, NULL
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white-xs', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'XS', 'Pure White', 'GS-GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-PURE-WHITE-XS', 14, NULL
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white-s', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'S', 'Pure White', 'GS-GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-PURE-WHITE-S', 22, NULL
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white-m', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'M', 'Pure White', 'GS-GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-PURE-WHITE-M', 18, NULL
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white-l', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'L', 'Pure White', 'GS-GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-PURE-WHITE-L', 5, NULL
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white-xl', 'gs-power-heavyweight-oversized-t-shirt-pure-white', 'XL', 'Pure White', 'GS-GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-PURE-WHITE-XL', 2, NULL
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown-xs', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'XS', 'Espresso Brown', 'GS-MINIMAL-STRAPPY-CROSS-BACK-SPORTS-BRA-ESPRESSO-BROWN-XS', 5, NULL
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown-s', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'S', 'Espresso Brown', 'GS-MINIMAL-STRAPPY-CROSS-BACK-SPORTS-BRA-ESPRESSO-BROWN-S', 2, NULL
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown-m', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'M', 'Espresso Brown', 'GS-MINIMAL-STRAPPY-CROSS-BACK-SPORTS-BRA-ESPRESSO-BROWN-M', 0, NULL
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown-l', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'L', 'Espresso Brown', 'GS-MINIMAL-STRAPPY-CROSS-BACK-SPORTS-BRA-ESPRESSO-BROWN-L', 11, NULL
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown-xl', 'minimal-strappy-cross-back-sports-bra-espresso-brown', 'XL', 'Espresso Brown', 'GS-MINIMAL-STRAPPY-CROSS-BACK-SPORTS-BRA-ESPRESSO-BROWN-XL', 14, NULL
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black-xs', 'apex-seamless-waterproof-running-jacket-stealth-black', 'XS', 'Stealth Black', 'GS-APEX-SEAMLESS-WATERPROOF-RUNNING-JACKET-STEALTH-BLACK-XS', 2, NULL
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black-s', 'apex-seamless-waterproof-running-jacket-stealth-black', 'S', 'Stealth Black', 'GS-APEX-SEAMLESS-WATERPROOF-RUNNING-JACKET-STEALTH-BLACK-S', 0, NULL
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black-m', 'apex-seamless-waterproof-running-jacket-stealth-black', 'M', 'Stealth Black', 'GS-APEX-SEAMLESS-WATERPROOF-RUNNING-JACKET-STEALTH-BLACK-M', 11, NULL
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black-l', 'apex-seamless-waterproof-running-jacket-stealth-black', 'L', 'Stealth Black', 'GS-APEX-SEAMLESS-WATERPROOF-RUNNING-JACKET-STEALTH-BLACK-L', 14, NULL
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black-xl', 'apex-seamless-waterproof-running-jacket-stealth-black', 'XL', 'Stealth Black', 'GS-APEX-SEAMLESS-WATERPROOF-RUNNING-JACKET-STEALTH-BLACK-XL', 22, NULL
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-xs', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'XS', 'Smokey Grey', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-CROP-TOP-SMOKEY-GREY-XS', 18, NULL
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-s', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'S', 'Smokey Grey', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-CROP-TOP-SMOKEY-GREY-S', 5, NULL
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-m', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'M', 'Smokey Grey', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-CROP-TOP-SMOKEY-GREY-M', 2, NULL
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-l', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'L', 'Smokey Grey', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-CROP-TOP-SMOKEY-GREY-L', 0, NULL
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey-xl', 'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'XL', 'Smokey Grey', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-CROP-TOP-SMOKEY-GREY-XL', 11, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl-xs', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'XS', 'Light Grey Marl', 'GS-TRAINING-OVERSIZED-FLEECE-PULLOVER-HOODIE-LIGHT-GREY-MARL-XS', 22, NULL
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl-s', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'S', 'Light Grey Marl', 'GS-TRAINING-OVERSIZED-FLEECE-PULLOVER-HOODIE-LIGHT-GREY-MARL-S', 18, NULL
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl-m', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'M', 'Light Grey Marl', 'GS-TRAINING-OVERSIZED-FLEECE-PULLOVER-HOODIE-LIGHT-GREY-MARL-M', 5, NULL
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl-l', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'L', 'Light Grey Marl', 'GS-TRAINING-OVERSIZED-FLEECE-PULLOVER-HOODIE-LIGHT-GREY-MARL-L', 2, NULL
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl-xl', 'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'XL', 'Light Grey Marl', 'GS-TRAINING-OVERSIZED-FLEECE-PULLOVER-HOODIE-LIGHT-GREY-MARL-XL', 0, NULL
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal-xs', 'sweat-seamless-high-waisted-leggings-deep-teal', 'XS', 'Deep Teal', 'GS-SWEAT-SEAMLESS-HIGH-WAISTED-LEGGINGS-DEEP-TEAL-XS', 2, NULL
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal-s', 'sweat-seamless-high-waisted-leggings-deep-teal', 'S', 'Deep Teal', 'GS-SWEAT-SEAMLESS-HIGH-WAISTED-LEGGINGS-DEEP-TEAL-S', 0, NULL
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal-m', 'sweat-seamless-high-waisted-leggings-deep-teal', 'M', 'Deep Teal', 'GS-SWEAT-SEAMLESS-HIGH-WAISTED-LEGGINGS-DEEP-TEAL-M', 11, NULL
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal-l', 'sweat-seamless-high-waisted-leggings-deep-teal', 'L', 'Deep Teal', 'GS-SWEAT-SEAMLESS-HIGH-WAISTED-LEGGINGS-DEEP-TEAL-L', 14, NULL
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal-xl', 'sweat-seamless-high-waisted-leggings-deep-teal', 'XL', 'Deep Teal', 'GS-SWEAT-SEAMLESS-HIGH-WAISTED-LEGGINGS-DEEP-TEAL-XL', 22, NULL
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl-xs', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'XS', 'Oatmeal Marl', 'GS-REST-DAY-LOUNGE-STRAIGHT-LEG-JOGGERS-OATMEAL-MARL-XS', 14, NULL
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl-s', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'S', 'Oatmeal Marl', 'GS-REST-DAY-LOUNGE-STRAIGHT-LEG-JOGGERS-OATMEAL-MARL-S', 22, NULL
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl-m', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'M', 'Oatmeal Marl', 'GS-REST-DAY-LOUNGE-STRAIGHT-LEG-JOGGERS-OATMEAL-MARL-M', 18, NULL
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl-l', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'L', 'Oatmeal Marl', 'GS-REST-DAY-LOUNGE-STRAIGHT-LEG-JOGGERS-OATMEAL-MARL-L', 5, NULL
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl-xl', 'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'XL', 'Oatmeal Marl', 'GS-REST-DAY-LOUNGE-STRAIGHT-LEG-JOGGERS-OATMEAL-MARL-XL', 2, NULL
),
(
  'training-midi-high-neck-sports-bra-navy-blue-xs', 'training-midi-high-neck-sports-bra-navy-blue', 'XS', 'Navy Blue', 'GS-TRAINING-MIDI-HIGH-NECK-SPORTS-BRA-NAVY-BLUE-XS', 18, NULL
),
(
  'training-midi-high-neck-sports-bra-navy-blue-s', 'training-midi-high-neck-sports-bra-navy-blue', 'S', 'Navy Blue', 'GS-TRAINING-MIDI-HIGH-NECK-SPORTS-BRA-NAVY-BLUE-S', 5, NULL
),
(
  'training-midi-high-neck-sports-bra-navy-blue-m', 'training-midi-high-neck-sports-bra-navy-blue', 'M', 'Navy Blue', 'GS-TRAINING-MIDI-HIGH-NECK-SPORTS-BRA-NAVY-BLUE-M', 2, NULL
),
(
  'training-midi-high-neck-sports-bra-navy-blue-l', 'training-midi-high-neck-sports-bra-navy-blue', 'L', 'Navy Blue', 'GS-TRAINING-MIDI-HIGH-NECK-SPORTS-BRA-NAVY-BLUE-L', 0, NULL
),
(
  'training-midi-high-neck-sports-bra-navy-blue-xl', 'training-midi-high-neck-sports-bra-navy-blue', 'XL', 'Navy Blue', 'GS-TRAINING-MIDI-HIGH-NECK-SPORTS-BRA-NAVY-BLUE-XL', 11, NULL
),
(
  'elevate-flared-crossover-leggings-pitch-black-xs', 'elevate-flared-crossover-leggings-pitch-black', 'XS', 'Pitch Black', 'GS-ELEVATE-FLARED-CROSSOVER-LEGGINGS-PITCH-BLACK-XS', 5, NULL
),
(
  'elevate-flared-crossover-leggings-pitch-black-s', 'elevate-flared-crossover-leggings-pitch-black', 'S', 'Pitch Black', 'GS-ELEVATE-FLARED-CROSSOVER-LEGGINGS-PITCH-BLACK-S', 2, NULL
),
(
  'elevate-flared-crossover-leggings-pitch-black-m', 'elevate-flared-crossover-leggings-pitch-black', 'M', 'Pitch Black', 'GS-ELEVATE-FLARED-CROSSOVER-LEGGINGS-PITCH-BLACK-M', 0, NULL
),
(
  'elevate-flared-crossover-leggings-pitch-black-l', 'elevate-flared-crossover-leggings-pitch-black', 'L', 'Pitch Black', 'GS-ELEVATE-FLARED-CROSSOVER-LEGGINGS-PITCH-BLACK-L', 11, NULL
),
(
  'elevate-flared-crossover-leggings-pitch-black-xl', 'elevate-flared-crossover-leggings-pitch-black', 'XL', 'Pitch Black', 'GS-ELEVATE-FLARED-CROSSOVER-LEGGINGS-PITCH-BLACK-XL', 14, NULL
),
(
  'gs-lc-ribbed-racerback-tank-forest-green-xs', 'gs-lc-ribbed-racerback-tank-forest-green', 'XS', 'Forest Green', 'GS-GS-LC-RIBBED-RACERBACK-TANK-FOREST-GREEN-XS', 0, NULL
),
(
  'gs-lc-ribbed-racerback-tank-forest-green-s', 'gs-lc-ribbed-racerback-tank-forest-green', 'S', 'Forest Green', 'GS-GS-LC-RIBBED-RACERBACK-TANK-FOREST-GREEN-S', 11, NULL
),
(
  'gs-lc-ribbed-racerback-tank-forest-green-m', 'gs-lc-ribbed-racerback-tank-forest-green', 'M', 'Forest Green', 'GS-GS-LC-RIBBED-RACERBACK-TANK-FOREST-GREEN-M', 14, NULL
),
(
  'gs-lc-ribbed-racerback-tank-forest-green-l', 'gs-lc-ribbed-racerback-tank-forest-green', 'L', 'Forest Green', 'GS-GS-LC-RIBBED-RACERBACK-TANK-FOREST-GREEN-L', 22, NULL
),
(
  'gs-lc-ribbed-racerback-tank-forest-green-xl', 'gs-lc-ribbed-racerback-tank-forest-green', 'XL', 'Forest Green', 'GS-GS-LC-RIBBED-RACERBACK-TANK-FOREST-GREEN-XL', 18, NULL
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown-xs', 'everyday-seamless-7-bike-shorts-mocha-brown', 'XS', 'Mocha Brown', 'GS-EVERYDAY-SEAMLESS-7-BIKE-SHORTS-MOCHA-BROWN-XS', 22, NULL
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown-s', 'everyday-seamless-7-bike-shorts-mocha-brown', 'S', 'Mocha Brown', 'GS-EVERYDAY-SEAMLESS-7-BIKE-SHORTS-MOCHA-BROWN-S', 18, NULL
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown-m', 'everyday-seamless-7-bike-shorts-mocha-brown', 'M', 'Mocha Brown', 'GS-EVERYDAY-SEAMLESS-7-BIKE-SHORTS-MOCHA-BROWN-M', 5, NULL
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown-l', 'everyday-seamless-7-bike-shorts-mocha-brown', 'L', 'Mocha Brown', 'GS-EVERYDAY-SEAMLESS-7-BIKE-SHORTS-MOCHA-BROWN-L', 2, NULL
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown-xl', 'everyday-seamless-7-bike-shorts-mocha-brown', 'XL', 'Mocha Brown', 'GS-EVERYDAY-SEAMLESS-7-BIKE-SHORTS-MOCHA-BROWN-XL', 0, NULL
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black-xs', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'XS', 'Neon Lime / Black', 'GS-SPEED-REFLECTIVE-WINDBREAKER-JACKET-NEON-LIME-BLACK-XS', 18, NULL
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black-s', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'S', 'Neon Lime / Black', 'GS-SPEED-REFLECTIVE-WINDBREAKER-JACKET-NEON-LIME-BLACK-S', 5, NULL
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black-m', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'M', 'Neon Lime / Black', 'GS-SPEED-REFLECTIVE-WINDBREAKER-JACKET-NEON-LIME-BLACK-M', 2, NULL
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black-l', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'L', 'Neon Lime / Black', 'GS-SPEED-REFLECTIVE-WINDBREAKER-JACKET-NEON-LIME-BLACK-L', 0, NULL
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black-xl', 'speed-reflective-windbreaker-jacket-neon-lime-black', 'XL', 'Neon Lime / Black', 'GS-SPEED-REFLECTIVE-WINDBREAKER-JACKET-NEON-LIME-BLACK-XL', 11, NULL
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink-xs', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'XS', 'Blush Pink', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-TOP-BLUSH-PINK-XS', 5, NULL
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink-s', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'S', 'Blush Pink', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-TOP-BLUSH-PINK-S', 2, NULL
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink-m', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'M', 'Blush Pink', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-TOP-BLUSH-PINK-M', 0, NULL
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink-l', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'L', 'Blush Pink', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-TOP-BLUSH-PINK-L', 11, NULL
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink-xl', 'vital-seamless-2-0-long-sleeve-top-blush-pink', 'XL', 'Blush Pink', 'GS-VITAL-SEAMLESS-2-0-LONG-SLEEVE-TOP-BLUSH-PINK-XL', 14, NULL
),
(
  'adapt-animal-seamless-leggings-charcoal-grey-xs', 'adapt-animal-seamless-leggings-charcoal-grey', 'XS', 'Charcoal Grey', 'GS-ADAPT-ANIMAL-SEAMLESS-LEGGINGS-CHARCOAL-GREY-XS', 18, NULL
),
(
  'adapt-animal-seamless-leggings-charcoal-grey-s', 'adapt-animal-seamless-leggings-charcoal-grey', 'S', 'Charcoal Grey', 'GS-ADAPT-ANIMAL-SEAMLESS-LEGGINGS-CHARCOAL-GREY-S', 5, NULL
),
(
  'adapt-animal-seamless-leggings-charcoal-grey-m', 'adapt-animal-seamless-leggings-charcoal-grey', 'M', 'Charcoal Grey', 'GS-ADAPT-ANIMAL-SEAMLESS-LEGGINGS-CHARCOAL-GREY-M', 2, NULL
),
(
  'adapt-animal-seamless-leggings-charcoal-grey-l', 'adapt-animal-seamless-leggings-charcoal-grey', 'L', 'Charcoal Grey', 'GS-ADAPT-ANIMAL-SEAMLESS-LEGGINGS-CHARCOAL-GREY-L', 0, NULL
),
(
  'adapt-animal-seamless-leggings-charcoal-grey-xl', 'adapt-animal-seamless-leggings-charcoal-grey', 'XL', 'Charcoal Grey', 'GS-ADAPT-ANIMAL-SEAMLESS-LEGGINGS-CHARCOAL-GREY-XL', 11, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'fraction-low-back-sports-bra-lilac-dusk-xs', 'fraction-low-back-sports-bra-lilac-dusk', 'XS', 'Lilac Dusk', 'GS-FRACTION-LOW-BACK-SPORTS-BRA-LILAC-DUSK-XS', 2, NULL
),
(
  'fraction-low-back-sports-bra-lilac-dusk-s', 'fraction-low-back-sports-bra-lilac-dusk', 'S', 'Lilac Dusk', 'GS-FRACTION-LOW-BACK-SPORTS-BRA-LILAC-DUSK-S', 0, NULL
),
(
  'fraction-low-back-sports-bra-lilac-dusk-m', 'fraction-low-back-sports-bra-lilac-dusk', 'M', 'Lilac Dusk', 'GS-FRACTION-LOW-BACK-SPORTS-BRA-LILAC-DUSK-M', 11, NULL
),
(
  'fraction-low-back-sports-bra-lilac-dusk-l', 'fraction-low-back-sports-bra-lilac-dusk', 'L', 'Lilac Dusk', 'GS-FRACTION-LOW-BACK-SPORTS-BRA-LILAC-DUSK-L', 14, NULL
),
(
  'fraction-low-back-sports-bra-lilac-dusk-xl', 'fraction-low-back-sports-bra-lilac-dusk', 'XL', 'Lilac Dusk', 'GS-FRACTION-LOW-BACK-SPORTS-BRA-LILAC-DUSK-XL', 22, NULL
),
(
  'power-muscle-tank-top-deep-plum-xs', 'power-muscle-tank-top-deep-plum', 'XS', 'Deep Plum', 'GS-POWER-MUSCLE-TANK-TOP-DEEP-PLUM-XS', 5, NULL
),
(
  'power-muscle-tank-top-deep-plum-s', 'power-muscle-tank-top-deep-plum', 'S', 'Deep Plum', 'GS-POWER-MUSCLE-TANK-TOP-DEEP-PLUM-S', 2, NULL
),
(
  'power-muscle-tank-top-deep-plum-m', 'power-muscle-tank-top-deep-plum', 'M', 'Deep Plum', 'GS-POWER-MUSCLE-TANK-TOP-DEEP-PLUM-M', 0, NULL
),
(
  'power-muscle-tank-top-deep-plum-l', 'power-muscle-tank-top-deep-plum', 'L', 'Deep Plum', 'GS-POWER-MUSCLE-TANK-TOP-DEEP-PLUM-L', 11, NULL
),
(
  'power-muscle-tank-top-deep-plum-xl', 'power-muscle-tank-top-deep-plum', 'XL', 'Deep Plum', 'GS-POWER-MUSCLE-TANK-TOP-DEEP-PLUM-XL', 14, NULL
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red-xs', 'hyper-amplified-high-waisted-leggings-crimson-red', 'XS', 'Crimson Red', 'GS-HYPER-AMPLIFIED-HIGH-WAISTED-LEGGINGS-CRIMSON-RED-XS', 14, NULL
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red-s', 'hyper-amplified-high-waisted-leggings-crimson-red', 'S', 'Crimson Red', 'GS-HYPER-AMPLIFIED-HIGH-WAISTED-LEGGINGS-CRIMSON-RED-S', 22, NULL
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red-m', 'hyper-amplified-high-waisted-leggings-crimson-red', 'M', 'Crimson Red', 'GS-HYPER-AMPLIFIED-HIGH-WAISTED-LEGGINGS-CRIMSON-RED-M', 18, NULL
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red-l', 'hyper-amplified-high-waisted-leggings-crimson-red', 'L', 'Crimson Red', 'GS-HYPER-AMPLIFIED-HIGH-WAISTED-LEGGINGS-CRIMSON-RED-L', 5, NULL
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red-xl', 'hyper-amplified-high-waisted-leggings-crimson-red', 'XL', 'Crimson Red', 'GS-HYPER-AMPLIFIED-HIGH-WAISTED-LEGGINGS-CRIMSON-RED-XL', 2, NULL
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes-xs', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'XS', 'Sand Dunes', 'GS-HEAVYWEIGHT-FLEECE-CREWNECK-SWEATSHIRT-SAND-DUNES-XS', 14, NULL
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes-s', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'S', 'Sand Dunes', 'GS-HEAVYWEIGHT-FLEECE-CREWNECK-SWEATSHIRT-SAND-DUNES-S', 22, NULL
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes-m', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'M', 'Sand Dunes', 'GS-HEAVYWEIGHT-FLEECE-CREWNECK-SWEATSHIRT-SAND-DUNES-M', 18, NULL
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes-l', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'L', 'Sand Dunes', 'GS-HEAVYWEIGHT-FLEECE-CREWNECK-SWEATSHIRT-SAND-DUNES-L', 5, NULL
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes-xl', 'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'XL', 'Sand Dunes', 'GS-HEAVYWEIGHT-FLEECE-CREWNECK-SWEATSHIRT-SAND-DUNES-XL', 2, NULL
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black-xs', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'XS', 'Pitch Black', 'GS-APEX-SEAMLESS-2-IN-1-RUNNING-SHORTS-PITCH-BLACK-XS', 0, NULL
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black-s', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'S', 'Pitch Black', 'GS-APEX-SEAMLESS-2-IN-1-RUNNING-SHORTS-PITCH-BLACK-S', 11, NULL
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black-m', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'M', 'Pitch Black', 'GS-APEX-SEAMLESS-2-IN-1-RUNNING-SHORTS-PITCH-BLACK-M', 14, NULL
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black-l', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'L', 'Pitch Black', 'GS-APEX-SEAMLESS-2-IN-1-RUNNING-SHORTS-PITCH-BLACK-L', 22, NULL
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black-xl', 'apex-seamless-2-in-1-running-shorts-pitch-black', 'XL', 'Pitch Black', 'GS-APEX-SEAMLESS-2-IN-1-RUNNING-SHORTS-PITCH-BLACK-XL', 18, NULL
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue-xs', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'XS', 'Electric Blue', 'GS-SPORT-CONTOUR-SCOOP-NECK-SPORTS-BRA-ELECTRIC-BLUE-XS', 14, NULL
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue-s', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'S', 'Electric Blue', 'GS-SPORT-CONTOUR-SCOOP-NECK-SPORTS-BRA-ELECTRIC-BLUE-S', 22, NULL
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue-m', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'M', 'Electric Blue', 'GS-SPORT-CONTOUR-SCOOP-NECK-SPORTS-BRA-ELECTRIC-BLUE-M', 18, NULL
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue-l', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'L', 'Electric Blue', 'GS-SPORT-CONTOUR-SCOOP-NECK-SPORTS-BRA-ELECTRIC-BLUE-L', 5, NULL
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue-xl', 'sport-contour-scoop-neck-sports-bra-electric-blue', 'XL', 'Electric Blue', 'GS-SPORT-CONTOUR-SCOOP-NECK-SPORTS-BRA-ELECTRIC-BLUE-XL', 2, NULL
),
(
  'training-lightweight-woven-track-pants-olive-green-xs', 'training-lightweight-woven-track-pants-olive-green', 'XS', 'Olive Green', 'GS-TRAINING-LIGHTWEIGHT-WOVEN-TRACK-PANTS-OLIVE-GREEN-XS', 22, NULL
),
(
  'training-lightweight-woven-track-pants-olive-green-s', 'training-lightweight-woven-track-pants-olive-green', 'S', 'Olive Green', 'GS-TRAINING-LIGHTWEIGHT-WOVEN-TRACK-PANTS-OLIVE-GREEN-S', 18, NULL
),
(
  'training-lightweight-woven-track-pants-olive-green-m', 'training-lightweight-woven-track-pants-olive-green', 'M', 'Olive Green', 'GS-TRAINING-LIGHTWEIGHT-WOVEN-TRACK-PANTS-OLIVE-GREEN-M', 5, NULL
),
(
  'training-lightweight-woven-track-pants-olive-green-l', 'training-lightweight-woven-track-pants-olive-green', 'L', 'Olive Green', 'GS-TRAINING-LIGHTWEIGHT-WOVEN-TRACK-PANTS-OLIVE-GREEN-L', 2, NULL
),
(
  'training-lightweight-woven-track-pants-olive-green-xl', 'training-lightweight-woven-track-pants-olive-green', 'XL', 'Olive Green', 'GS-TRAINING-LIGHTWEIGHT-WOVEN-TRACK-PANTS-OLIVE-GREEN-XL', 0, NULL
),
(
  'softsense-ribbed-cami-tank-chalk-white-xs', 'softsense-ribbed-cami-tank-chalk-white', 'XS', 'Chalk White', 'GS-SOFTSENSE-RIBBED-CAMI-TANK-CHALK-WHITE-XS', 5, NULL
),
(
  'softsense-ribbed-cami-tank-chalk-white-s', 'softsense-ribbed-cami-tank-chalk-white', 'S', 'Chalk White', 'GS-SOFTSENSE-RIBBED-CAMI-TANK-CHALK-WHITE-S', 2, NULL
),
(
  'softsense-ribbed-cami-tank-chalk-white-m', 'softsense-ribbed-cami-tank-chalk-white', 'M', 'Chalk White', 'GS-SOFTSENSE-RIBBED-CAMI-TANK-CHALK-WHITE-M', 0, NULL
),
(
  'softsense-ribbed-cami-tank-chalk-white-l', 'softsense-ribbed-cami-tank-chalk-white', 'L', 'Chalk White', 'GS-SOFTSENSE-RIBBED-CAMI-TANK-CHALK-WHITE-L', 11, NULL
),
(
  'softsense-ribbed-cami-tank-chalk-white-xl', 'softsense-ribbed-cami-tank-chalk-white', 'XL', 'Chalk White', 'GS-SOFTSENSE-RIBBED-CAMI-TANK-CHALK-WHITE-XL', 14, NULL
),
(
  'vital-seamless-2-0-4-shorts-emerald-green-xs', 'vital-seamless-2-0-4-shorts-emerald-green', 'XS', 'Emerald Green', 'GS-VITAL-SEAMLESS-2-0-4-SHORTS-EMERALD-GREEN-XS', 11, NULL
),
(
  'vital-seamless-2-0-4-shorts-emerald-green-s', 'vital-seamless-2-0-4-shorts-emerald-green', 'S', 'Emerald Green', 'GS-VITAL-SEAMLESS-2-0-4-SHORTS-EMERALD-GREEN-S', 14, NULL
),
(
  'vital-seamless-2-0-4-shorts-emerald-green-m', 'vital-seamless-2-0-4-shorts-emerald-green', 'M', 'Emerald Green', 'GS-VITAL-SEAMLESS-2-0-4-SHORTS-EMERALD-GREEN-M', 22, NULL
),
(
  'vital-seamless-2-0-4-shorts-emerald-green-l', 'vital-seamless-2-0-4-shorts-emerald-green', 'L', 'Emerald Green', 'GS-VITAL-SEAMLESS-2-0-4-SHORTS-EMERALD-GREEN-L', 18, NULL
),
(
  'vital-seamless-2-0-4-shorts-emerald-green-xl', 'vital-seamless-2-0-4-shorts-emerald-green', 'XL', 'Emerald Green', 'GS-VITAL-SEAMLESS-2-0-4-SHORTS-EMERALD-GREEN-XL', 5, NULL
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust-xs', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'XS', 'Terracotta Rust', 'GS-GS-POWER-MULTI-STRAP-LIFTING-BRA-TERRACOTTA-RUST-XS', 11, NULL
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust-s', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'S', 'Terracotta Rust', 'GS-GS-POWER-MULTI-STRAP-LIFTING-BRA-TERRACOTTA-RUST-S', 14, NULL
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust-m', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'M', 'Terracotta Rust', 'GS-GS-POWER-MULTI-STRAP-LIFTING-BRA-TERRACOTTA-RUST-M', 22, NULL
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust-l', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'L', 'Terracotta Rust', 'GS-GS-POWER-MULTI-STRAP-LIFTING-BRA-TERRACOTTA-RUST-L', 18, NULL
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust-xl', 'gs-power-multi-strap-lifting-bra-terracotta-rust', 'XL', 'Terracotta Rust', 'GS-GS-POWER-MULTI-STRAP-LIFTING-BRA-TERRACOTTA-RUST-XL', 5, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black-xs', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'XS', 'Obsidian Black', 'GS-REST-DAY-SEAMLESS-ALL-IN-ONE-UNITARD-OBSIDIAN-BLACK-XS', 18, NULL
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black-s', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'S', 'Obsidian Black', 'GS-REST-DAY-SEAMLESS-ALL-IN-ONE-UNITARD-OBSIDIAN-BLACK-S', 5, NULL
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black-m', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'M', 'Obsidian Black', 'GS-REST-DAY-SEAMLESS-ALL-IN-ONE-UNITARD-OBSIDIAN-BLACK-M', 2, NULL
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black-l', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'L', 'Obsidian Black', 'GS-REST-DAY-SEAMLESS-ALL-IN-ONE-UNITARD-OBSIDIAN-BLACK-L', 0, NULL
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black-xl', 'rest-day-seamless-all-in-one-unitard-obsidian-black', 'XL', 'Obsidian Black', 'GS-REST-DAY-SEAMLESS-ALL-IN-ONE-UNITARD-OBSIDIAN-BLACK-XL', 11, NULL
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather-xs', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'XS', 'Charcoal Heather', 'GS-STUDIO-HIGH-RISE-FLARED-RIBBED-PANTS-CHARCOAL-HEATHER-XS', 2, NULL
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather-s', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'S', 'Charcoal Heather', 'GS-STUDIO-HIGH-RISE-FLARED-RIBBED-PANTS-CHARCOAL-HEATHER-S', 0, NULL
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather-m', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'M', 'Charcoal Heather', 'GS-STUDIO-HIGH-RISE-FLARED-RIBBED-PANTS-CHARCOAL-HEATHER-M', 11, NULL
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather-l', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'L', 'Charcoal Heather', 'GS-STUDIO-HIGH-RISE-FLARED-RIBBED-PANTS-CHARCOAL-HEATHER-L', 14, NULL
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather-xl', 'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'XL', 'Charcoal Heather', 'GS-STUDIO-HIGH-RISE-FLARED-RIBBED-PANTS-CHARCOAL-HEATHER-XL', 22, NULL
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy-xs', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'XS', 'Faded Navy', 'GS-LEGACY-GRAPHIC-OVERSIZED-HEAVYWEIGHT-TEE-FADED-NAVY-XS', 18, NULL
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy-s', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'S', 'Faded Navy', 'GS-LEGACY-GRAPHIC-OVERSIZED-HEAVYWEIGHT-TEE-FADED-NAVY-S', 5, NULL
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy-m', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'M', 'Faded Navy', 'GS-LEGACY-GRAPHIC-OVERSIZED-HEAVYWEIGHT-TEE-FADED-NAVY-M', 2, NULL
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy-l', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'L', 'Faded Navy', 'GS-LEGACY-GRAPHIC-OVERSIZED-HEAVYWEIGHT-TEE-FADED-NAVY-L', 0, NULL
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy-xl', 'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'XL', 'Faded Navy', 'GS-LEGACY-GRAPHIC-OVERSIZED-HEAVYWEIGHT-TEE-FADED-NAVY-XL', 11, NULL
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe-xs', 'elevate-packable-windbreaker-anorak-pale-taupe', 'XS', 'Pale Taupe', 'GS-ELEVATE-PACKABLE-WINDBREAKER-ANORAK-PALE-TAUPE-XS', 2, NULL
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe-s', 'elevate-packable-windbreaker-anorak-pale-taupe', 'S', 'Pale Taupe', 'GS-ELEVATE-PACKABLE-WINDBREAKER-ANORAK-PALE-TAUPE-S', 0, NULL
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe-m', 'elevate-packable-windbreaker-anorak-pale-taupe', 'M', 'Pale Taupe', 'GS-ELEVATE-PACKABLE-WINDBREAKER-ANORAK-PALE-TAUPE-M', 11, NULL
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe-l', 'elevate-packable-windbreaker-anorak-pale-taupe', 'L', 'Pale Taupe', 'GS-ELEVATE-PACKABLE-WINDBREAKER-ANORAK-PALE-TAUPE-L', 14, NULL
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe-xl', 'elevate-packable-windbreaker-anorak-pale-taupe', 'XL', 'Pale Taupe', 'GS-ELEVATE-PACKABLE-WINDBREAKER-ANORAK-PALE-TAUPE-XL', 22, NULL
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-xs', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'XS', 'Lavender Blue Fleck', 'GS-ADAPT-FLECK-SEAMLESS-HIGH-WAISTED-LEGGINGS-LAVENDER-BLUE-FLECK-XS', 11, NULL
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-s', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'S', 'Lavender Blue Fleck', 'GS-ADAPT-FLECK-SEAMLESS-HIGH-WAISTED-LEGGINGS-LAVENDER-BLUE-FLECK-S', 14, NULL
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-m', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'M', 'Lavender Blue Fleck', 'GS-ADAPT-FLECK-SEAMLESS-HIGH-WAISTED-LEGGINGS-LAVENDER-BLUE-FLECK-M', 22, NULL
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-l', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'L', 'Lavender Blue Fleck', 'GS-ADAPT-FLECK-SEAMLESS-HIGH-WAISTED-LEGGINGS-LAVENDER-BLUE-FLECK-L', 18, NULL
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck-xl', 'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'XL', 'Lavender Blue Fleck', 'GS-ADAPT-FLECK-SEAMLESS-HIGH-WAISTED-LEGGINGS-LAVENDER-BLUE-FLECK-XL', 5, NULL
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose-xs', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'XS', 'Dusty Rose', 'GS-MINIMAL-CLEAN-CUT-CROSS-BACK-BRALETTE-DUSTY-ROSE-XS', 11, NULL
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose-s', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'S', 'Dusty Rose', 'GS-MINIMAL-CLEAN-CUT-CROSS-BACK-BRALETTE-DUSTY-ROSE-S', 14, NULL
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose-m', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'M', 'Dusty Rose', 'GS-MINIMAL-CLEAN-CUT-CROSS-BACK-BRALETTE-DUSTY-ROSE-M', 22, NULL
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose-l', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'L', 'Dusty Rose', 'GS-MINIMAL-CLEAN-CUT-CROSS-BACK-BRALETTE-DUSTY-ROSE-L', 18, NULL
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose-xl', 'minimal-clean-cut-cross-back-bralette-dusty-rose', 'XL', 'Dusty Rose', 'GS-MINIMAL-CLEAN-CUT-CROSS-BACK-BRALETTE-DUSTY-ROSE-XL', 5, NULL
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow-xs', 'training-loose-fit-breathable-tank-sunburst-yellow', 'XS', 'Sunburst Yellow', 'GS-TRAINING-LOOSE-FIT-BREATHABLE-TANK-SUNBURST-YELLOW-XS', 22, NULL
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow-s', 'training-loose-fit-breathable-tank-sunburst-yellow', 'S', 'Sunburst Yellow', 'GS-TRAINING-LOOSE-FIT-BREATHABLE-TANK-SUNBURST-YELLOW-S', 18, NULL
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow-m', 'training-loose-fit-breathable-tank-sunburst-yellow', 'M', 'Sunburst Yellow', 'GS-TRAINING-LOOSE-FIT-BREATHABLE-TANK-SUNBURST-YELLOW-M', 5, NULL
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow-l', 'training-loose-fit-breathable-tank-sunburst-yellow', 'L', 'Sunburst Yellow', 'GS-TRAINING-LOOSE-FIT-BREATHABLE-TANK-SUNBURST-YELLOW-L', 2, NULL
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow-xl', 'training-loose-fit-breathable-tank-sunburst-yellow', 'XL', 'Sunburst Yellow', 'GS-TRAINING-LOOSE-FIT-BREATHABLE-TANK-SUNBURST-YELLOW-XL', 0, NULL
),
(
  'vital-seamless-half-zip-pullover-steel-blue-xs', 'vital-seamless-half-zip-pullover-steel-blue', 'XS', 'Steel Blue', 'GS-VITAL-SEAMLESS-HALF-ZIP-PULLOVER-STEEL-BLUE-XS', 22, NULL
),
(
  'vital-seamless-half-zip-pullover-steel-blue-s', 'vital-seamless-half-zip-pullover-steel-blue', 'S', 'Steel Blue', 'GS-VITAL-SEAMLESS-HALF-ZIP-PULLOVER-STEEL-BLUE-S', 18, NULL
),
(
  'vital-seamless-half-zip-pullover-steel-blue-m', 'vital-seamless-half-zip-pullover-steel-blue', 'M', 'Steel Blue', 'GS-VITAL-SEAMLESS-HALF-ZIP-PULLOVER-STEEL-BLUE-M', 5, NULL
),
(
  'vital-seamless-half-zip-pullover-steel-blue-l', 'vital-seamless-half-zip-pullover-steel-blue', 'L', 'Steel Blue', 'GS-VITAL-SEAMLESS-HALF-ZIP-PULLOVER-STEEL-BLUE-L', 2, NULL
),
(
  'vital-seamless-half-zip-pullover-steel-blue-xl', 'vital-seamless-half-zip-pullover-steel-blue', 'XL', 'Steel Blue', 'GS-VITAL-SEAMLESS-HALF-ZIP-PULLOVER-STEEL-BLUE-XL', 0, NULL
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry-xs', 'power-ribbed-cycle-shorts-8-dark-cherry', 'XS', 'Dark Cherry', 'GS-POWER-RIBBED-CYCLE-SHORTS-8-DARK-CHERRY-XS', 2, NULL
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry-s', 'power-ribbed-cycle-shorts-8-dark-cherry', 'S', 'Dark Cherry', 'GS-POWER-RIBBED-CYCLE-SHORTS-8-DARK-CHERRY-S', 0, NULL
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry-m', 'power-ribbed-cycle-shorts-8-dark-cherry', 'M', 'Dark Cherry', 'GS-POWER-RIBBED-CYCLE-SHORTS-8-DARK-CHERRY-M', 11, NULL
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry-l', 'power-ribbed-cycle-shorts-8-dark-cherry', 'L', 'Dark Cherry', 'GS-POWER-RIBBED-CYCLE-SHORTS-8-DARK-CHERRY-L', 14, NULL
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry-xl', 'power-ribbed-cycle-shorts-8-dark-cherry', 'XL', 'Dark Cherry', 'GS-POWER-RIBBED-CYCLE-SHORTS-8-DARK-CHERRY-XL', 22, NULL
),
(
  'essential-boxy-cropped-t-shirt-chalk-white-xs', 'essential-boxy-cropped-t-shirt-chalk-white', 'XS', 'Chalk White', 'GS-ESSENTIAL-BOXY-CROPPED-T-SHIRT-CHALK-WHITE-XS', 14, NULL
),
(
  'essential-boxy-cropped-t-shirt-chalk-white-s', 'essential-boxy-cropped-t-shirt-chalk-white', 'S', 'Chalk White', 'GS-ESSENTIAL-BOXY-CROPPED-T-SHIRT-CHALK-WHITE-S', 22, NULL
),
(
  'essential-boxy-cropped-t-shirt-chalk-white-m', 'essential-boxy-cropped-t-shirt-chalk-white', 'M', 'Chalk White', 'GS-ESSENTIAL-BOXY-CROPPED-T-SHIRT-CHALK-WHITE-M', 18, NULL
),
(
  'essential-boxy-cropped-t-shirt-chalk-white-l', 'essential-boxy-cropped-t-shirt-chalk-white', 'L', 'Chalk White', 'GS-ESSENTIAL-BOXY-CROPPED-T-SHIRT-CHALK-WHITE-L', 5, NULL
),
(
  'essential-boxy-cropped-t-shirt-chalk-white-xl', 'essential-boxy-cropped-t-shirt-chalk-white', 'XL', 'Chalk White', 'GS-ESSENTIAL-BOXY-CROPPED-T-SHIRT-CHALK-WHITE-XL', 2, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'power-heavyweight-oversized-t-shirt-washed-black-xs', 'power-heavyweight-oversized-t-shirt-washed-black', 'XS', 'Washed Black', 'GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-WASHED-BLACK-XS', 11, NULL
),
(
  'power-heavyweight-oversized-t-shirt-washed-black-s', 'power-heavyweight-oversized-t-shirt-washed-black', 'S', 'Washed Black', 'GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-WASHED-BLACK-S', 14, NULL
),
(
  'power-heavyweight-oversized-t-shirt-washed-black-m', 'power-heavyweight-oversized-t-shirt-washed-black', 'M', 'Washed Black', 'GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-WASHED-BLACK-M', 22, NULL
),
(
  'power-heavyweight-oversized-t-shirt-washed-black-l', 'power-heavyweight-oversized-t-shirt-washed-black', 'L', 'Washed Black', 'GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-WASHED-BLACK-L', 18, NULL
),
(
  'power-heavyweight-oversized-t-shirt-washed-black-xl', 'power-heavyweight-oversized-t-shirt-washed-black', 'XL', 'Washed Black', 'GS-POWER-HEAVYWEIGHT-OVERSIZED-T-SHIRT-WASHED-BLACK-XL', 5, NULL
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black-xs', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'XS', 'Stealth Black', 'GS-APEX-HYBRID-5-PERFORMANCE-RUNNING-SHORTS-STEALTH-BLACK-XS', 0, NULL
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black-s', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'S', 'Stealth Black', 'GS-APEX-HYBRID-5-PERFORMANCE-RUNNING-SHORTS-STEALTH-BLACK-S', 11, NULL
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black-m', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'M', 'Stealth Black', 'GS-APEX-HYBRID-5-PERFORMANCE-RUNNING-SHORTS-STEALTH-BLACK-M', 14, NULL
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black-l', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'L', 'Stealth Black', 'GS-APEX-HYBRID-5-PERFORMANCE-RUNNING-SHORTS-STEALTH-BLACK-L', 22, NULL
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black-xl', 'apex-hybrid-5-performance-running-shorts-stealth-black', 'XL', 'Stealth Black', 'GS-APEX-HYBRID-5-PERFORMANCE-RUNNING-SHORTS-STEALTH-BLACK-XL', 18, NULL
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl-xs', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'XS', 'Navy Blue Marl', 'GS-CREST-HEAVYWEIGHT-PULLOVER-HOODIE-NAVY-BLUE-MARL-XS', 11, NULL
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl-s', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'S', 'Navy Blue Marl', 'GS-CREST-HEAVYWEIGHT-PULLOVER-HOODIE-NAVY-BLUE-MARL-S', 14, NULL
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl-m', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'M', 'Navy Blue Marl', 'GS-CREST-HEAVYWEIGHT-PULLOVER-HOODIE-NAVY-BLUE-MARL-M', 22, NULL
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl-l', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'L', 'Navy Blue Marl', 'GS-CREST-HEAVYWEIGHT-PULLOVER-HOODIE-NAVY-BLUE-MARL-L', 18, NULL
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl-xl', 'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'XL', 'Navy Blue Marl', 'GS-CREST-HEAVYWEIGHT-PULLOVER-HOODIE-NAVY-BLUE-MARL-XL', 5, NULL
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl-xs', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'XS', 'Charcoal Marl', 'GS-CRITICAL-2-0-DROP-ARM-STRINGER-VEST-CHARCOAL-MARL-XS', 14, NULL
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl-s', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'S', 'Charcoal Marl', 'GS-CRITICAL-2-0-DROP-ARM-STRINGER-VEST-CHARCOAL-MARL-S', 22, NULL
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl-m', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'M', 'Charcoal Marl', 'GS-CRITICAL-2-0-DROP-ARM-STRINGER-VEST-CHARCOAL-MARL-M', 18, NULL
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl-l', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'L', 'Charcoal Marl', 'GS-CRITICAL-2-0-DROP-ARM-STRINGER-VEST-CHARCOAL-MARL-L', 5, NULL
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl-xl', 'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'XL', 'Charcoal Marl', 'GS-CRITICAL-2-0-DROP-ARM-STRINGER-VEST-CHARCOAL-MARL-XL', 2, NULL
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey-xs', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'XS', 'Graphite Grey', 'GS-ARRIVAL-7-SLIM-FIT-TRAINING-SHORTS-GRAPHITE-GREY-XS', 11, NULL
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey-s', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'S', 'Graphite Grey', 'GS-ARRIVAL-7-SLIM-FIT-TRAINING-SHORTS-GRAPHITE-GREY-S', 14, NULL
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey-m', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'M', 'Graphite Grey', 'GS-ARRIVAL-7-SLIM-FIT-TRAINING-SHORTS-GRAPHITE-GREY-M', 22, NULL
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey-l', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'L', 'Graphite Grey', 'GS-ARRIVAL-7-SLIM-FIT-TRAINING-SHORTS-GRAPHITE-GREY-L', 18, NULL
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey-xl', 'arrival-7-slim-fit-training-shorts-graphite-grey', 'XL', 'Graphite Grey', 'GS-ARRIVAL-7-SLIM-FIT-TRAINING-SHORTS-GRAPHITE-GREY-XL', 5, NULL
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green-xs', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'XS', 'Dark Olive Green', 'GS-LEGACY-HEAVYWEIGHT-GRAPHIC-T-SHIRT-DARK-OLIVE-GREEN-XS', 18, NULL
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green-s', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'S', 'Dark Olive Green', 'GS-LEGACY-HEAVYWEIGHT-GRAPHIC-T-SHIRT-DARK-OLIVE-GREEN-S', 5, NULL
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green-m', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'M', 'Dark Olive Green', 'GS-LEGACY-HEAVYWEIGHT-GRAPHIC-T-SHIRT-DARK-OLIVE-GREEN-M', 2, NULL
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green-l', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'L', 'Dark Olive Green', 'GS-LEGACY-HEAVYWEIGHT-GRAPHIC-T-SHIRT-DARK-OLIVE-GREEN-L', 0, NULL
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green-xl', 'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'XL', 'Dark Olive Green', 'GS-LEGACY-HEAVYWEIGHT-GRAPHIC-T-SHIRT-DARK-OLIVE-GREEN-XL', 11, NULL
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey-xs', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'XS', 'Slate Grey', 'GS-GEO-SEAMLESS-MUSCLE-FIT-T-SHIRT-SLATE-GREY-XS', 14, NULL
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey-s', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'S', 'Slate Grey', 'GS-GEO-SEAMLESS-MUSCLE-FIT-T-SHIRT-SLATE-GREY-S', 22, NULL
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey-m', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'M', 'Slate Grey', 'GS-GEO-SEAMLESS-MUSCLE-FIT-T-SHIRT-SLATE-GREY-M', 18, NULL
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey-l', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'L', 'Slate Grey', 'GS-GEO-SEAMLESS-MUSCLE-FIT-T-SHIRT-SLATE-GREY-L', 5, NULL
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey-xl', 'geo-seamless-muscle-fit-t-shirt-slate-grey', 'XL', 'Slate Grey', 'GS-GEO-SEAMLESS-MUSCLE-FIT-T-SHIRT-SLATE-GREY-XL', 2, NULL
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black-xs', 'sport-seamless-full-zip-track-jacket-pitch-black', 'XS', 'Pitch Black', 'GS-SPORT-SEAMLESS-FULL-ZIP-TRACK-JACKET-PITCH-BLACK-XS', 11, NULL
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black-s', 'sport-seamless-full-zip-track-jacket-pitch-black', 'S', 'Pitch Black', 'GS-SPORT-SEAMLESS-FULL-ZIP-TRACK-JACKET-PITCH-BLACK-S', 14, NULL
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black-m', 'sport-seamless-full-zip-track-jacket-pitch-black', 'M', 'Pitch Black', 'GS-SPORT-SEAMLESS-FULL-ZIP-TRACK-JACKET-PITCH-BLACK-M', 22, NULL
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black-l', 'sport-seamless-full-zip-track-jacket-pitch-black', 'L', 'Pitch Black', 'GS-SPORT-SEAMLESS-FULL-ZIP-TRACK-JACKET-PITCH-BLACK-L', 18, NULL
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black-xl', 'sport-seamless-full-zip-track-jacket-pitch-black', 'XL', 'Pitch Black', 'GS-SPORT-SEAMLESS-FULL-ZIP-TRACK-JACKET-PITCH-BLACK-XL', 5, NULL
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal-xs', 'power-heavyweight-lifting-joggers-washed-charcoal', 'XS', 'Washed Charcoal', 'GS-POWER-HEAVYWEIGHT-LIFTING-JOGGERS-WASHED-CHARCOAL-XS', 14, NULL
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal-s', 'power-heavyweight-lifting-joggers-washed-charcoal', 'S', 'Washed Charcoal', 'GS-POWER-HEAVYWEIGHT-LIFTING-JOGGERS-WASHED-CHARCOAL-S', 22, NULL
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal-m', 'power-heavyweight-lifting-joggers-washed-charcoal', 'M', 'Washed Charcoal', 'GS-POWER-HEAVYWEIGHT-LIFTING-JOGGERS-WASHED-CHARCOAL-M', 18, NULL
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal-l', 'power-heavyweight-lifting-joggers-washed-charcoal', 'L', 'Washed Charcoal', 'GS-POWER-HEAVYWEIGHT-LIFTING-JOGGERS-WASHED-CHARCOAL-L', 5, NULL
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal-xl', 'power-heavyweight-lifting-joggers-washed-charcoal', 'XL', 'Washed Charcoal', 'GS-POWER-HEAVYWEIGHT-LIFTING-JOGGERS-WASHED-CHARCOAL-XL', 2, NULL
),
(
  'arrival-slim-fit-performance-tank-pure-white-xs', 'arrival-slim-fit-performance-tank-pure-white', 'XS', 'Pure White', 'GS-ARRIVAL-SLIM-FIT-PERFORMANCE-TANK-PURE-WHITE-XS', 18, NULL
),
(
  'arrival-slim-fit-performance-tank-pure-white-s', 'arrival-slim-fit-performance-tank-pure-white', 'S', 'Pure White', 'GS-ARRIVAL-SLIM-FIT-PERFORMANCE-TANK-PURE-WHITE-S', 5, NULL
),
(
  'arrival-slim-fit-performance-tank-pure-white-m', 'arrival-slim-fit-performance-tank-pure-white', 'M', 'Pure White', 'GS-ARRIVAL-SLIM-FIT-PERFORMANCE-TANK-PURE-WHITE-M', 2, NULL
),
(
  'arrival-slim-fit-performance-tank-pure-white-l', 'arrival-slim-fit-performance-tank-pure-white', 'L', 'Pure White', 'GS-ARRIVAL-SLIM-FIT-PERFORMANCE-TANK-PURE-WHITE-L', 0, NULL
),
(
  'arrival-slim-fit-performance-tank-pure-white-xl', 'arrival-slim-fit-performance-tank-pure-white', 'XL', 'Pure White', 'GS-ARRIVAL-SLIM-FIT-PERFORMANCE-TANK-PURE-WHITE-XL', 11, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black-xs', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'XS', 'Reflective Silver / Black', 'GS-APEX-BREATHABLE-SEAMLESS-LONG-SLEEVE-TOP-REFLECTIVE-SILVER-BLACK-XS', 22, NULL
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black-s', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'S', 'Reflective Silver / Black', 'GS-APEX-BREATHABLE-SEAMLESS-LONG-SLEEVE-TOP-REFLECTIVE-SILVER-BLACK-S', 18, NULL
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black-m', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'M', 'Reflective Silver / Black', 'GS-APEX-BREATHABLE-SEAMLESS-LONG-SLEEVE-TOP-REFLECTIVE-SILVER-BLACK-M', 5, NULL
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black-l', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'L', 'Reflective Silver / Black', 'GS-APEX-BREATHABLE-SEAMLESS-LONG-SLEEVE-TOP-REFLECTIVE-SILVER-BLACK-L', 2, NULL
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black-xl', 'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'XL', 'Reflective Silver / Black', 'GS-APEX-BREATHABLE-SEAMLESS-LONG-SLEEVE-TOP-REFLECTIVE-SILVER-BLACK-XL', 0, NULL
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl-xs', 'crest-slim-fit-fleece-sweatpants-black-marl', 'XS', 'Black Marl', 'GS-CREST-SLIM-FIT-FLEECE-SWEATPANTS-BLACK-MARL-XS', 22, NULL
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl-s', 'crest-slim-fit-fleece-sweatpants-black-marl', 'S', 'Black Marl', 'GS-CREST-SLIM-FIT-FLEECE-SWEATPANTS-BLACK-MARL-S', 18, NULL
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl-m', 'crest-slim-fit-fleece-sweatpants-black-marl', 'M', 'Black Marl', 'GS-CREST-SLIM-FIT-FLEECE-SWEATPANTS-BLACK-MARL-M', 5, NULL
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl-l', 'crest-slim-fit-fleece-sweatpants-black-marl', 'L', 'Black Marl', 'GS-CREST-SLIM-FIT-FLEECE-SWEATPANTS-BLACK-MARL-L', 2, NULL
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl-xl', 'crest-slim-fit-fleece-sweatpants-black-marl', 'XL', 'Black Marl', 'GS-CREST-SLIM-FIT-FLEECE-SWEATPANTS-BLACK-MARL-XL', 0, NULL
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy-xs', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'XS', 'Deep Burgundy', 'GS-HEAVYWEIGHT-HERITAGE-PUMP-COVER-HOODIE-DEEP-BURGUNDY-XS', 5, NULL
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy-s', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'S', 'Deep Burgundy', 'GS-HEAVYWEIGHT-HERITAGE-PUMP-COVER-HOODIE-DEEP-BURGUNDY-S', 2, NULL
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy-m', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'M', 'Deep Burgundy', 'GS-HEAVYWEIGHT-HERITAGE-PUMP-COVER-HOODIE-DEEP-BURGUNDY-M', 0, NULL
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy-l', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'L', 'Deep Burgundy', 'GS-HEAVYWEIGHT-HERITAGE-PUMP-COVER-HOODIE-DEEP-BURGUNDY-L', 11, NULL
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy-xl', 'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'XL', 'Deep Burgundy', 'GS-HEAVYWEIGHT-HERITAGE-PUMP-COVER-HOODIE-DEEP-BURGUNDY-XL', 14, NULL
),
(
  'critical-full-zip-training-hoodie-light-grey-marl-xs', 'critical-full-zip-training-hoodie-light-grey-marl', 'XS', 'Light Grey Marl', 'GS-CRITICAL-FULL-ZIP-TRAINING-HOODIE-LIGHT-GREY-MARL-XS', 14, NULL
),
(
  'critical-full-zip-training-hoodie-light-grey-marl-s', 'critical-full-zip-training-hoodie-light-grey-marl', 'S', 'Light Grey Marl', 'GS-CRITICAL-FULL-ZIP-TRAINING-HOODIE-LIGHT-GREY-MARL-S', 22, NULL
),
(
  'critical-full-zip-training-hoodie-light-grey-marl-m', 'critical-full-zip-training-hoodie-light-grey-marl', 'M', 'Light Grey Marl', 'GS-CRITICAL-FULL-ZIP-TRAINING-HOODIE-LIGHT-GREY-MARL-M', 18, NULL
),
(
  'critical-full-zip-training-hoodie-light-grey-marl-l', 'critical-full-zip-training-hoodie-light-grey-marl', 'L', 'Light Grey Marl', 'GS-CRITICAL-FULL-ZIP-TRAINING-HOODIE-LIGHT-GREY-MARL-L', 5, NULL
),
(
  'critical-full-zip-training-hoodie-light-grey-marl-xl', 'critical-full-zip-training-hoodie-light-grey-marl', 'XL', 'Light Grey Marl', 'GS-CRITICAL-FULL-ZIP-TRAINING-HOODIE-LIGHT-GREY-MARL-XL', 2, NULL
),
(
  'sport-5-lined-training-shorts-cobalt-blue-xs', 'sport-5-lined-training-shorts-cobalt-blue', 'XS', 'Cobalt Blue', 'GS-SPORT-5-LINED-TRAINING-SHORTS-COBALT-BLUE-XS', 11, NULL
),
(
  'sport-5-lined-training-shorts-cobalt-blue-s', 'sport-5-lined-training-shorts-cobalt-blue', 'S', 'Cobalt Blue', 'GS-SPORT-5-LINED-TRAINING-SHORTS-COBALT-BLUE-S', 14, NULL
),
(
  'sport-5-lined-training-shorts-cobalt-blue-m', 'sport-5-lined-training-shorts-cobalt-blue', 'M', 'Cobalt Blue', 'GS-SPORT-5-LINED-TRAINING-SHORTS-COBALT-BLUE-M', 22, NULL
),
(
  'sport-5-lined-training-shorts-cobalt-blue-l', 'sport-5-lined-training-shorts-cobalt-blue', 'L', 'Cobalt Blue', 'GS-SPORT-5-LINED-TRAINING-SHORTS-COBALT-BLUE-L', 18, NULL
),
(
  'sport-5-lined-training-shorts-cobalt-blue-xl', 'sport-5-lined-training-shorts-cobalt-blue', 'XL', 'Cobalt Blue', 'GS-SPORT-5-LINED-TRAINING-SHORTS-COBALT-BLUE-XL', 5, NULL
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white-xs', 'legacy-oversized-boxy-t-shirt-chalk-white', 'XS', 'Chalk White', 'GS-LEGACY-OVERSIZED-BOXY-T-SHIRT-CHALK-WHITE-XS', 11, NULL
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white-s', 'legacy-oversized-boxy-t-shirt-chalk-white', 'S', 'Chalk White', 'GS-LEGACY-OVERSIZED-BOXY-T-SHIRT-CHALK-WHITE-S', 14, NULL
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white-m', 'legacy-oversized-boxy-t-shirt-chalk-white', 'M', 'Chalk White', 'GS-LEGACY-OVERSIZED-BOXY-T-SHIRT-CHALK-WHITE-M', 22, NULL
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white-l', 'legacy-oversized-boxy-t-shirt-chalk-white', 'L', 'Chalk White', 'GS-LEGACY-OVERSIZED-BOXY-T-SHIRT-CHALK-WHITE-L', 18, NULL
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white-xl', 'legacy-oversized-boxy-t-shirt-chalk-white', 'XL', 'Chalk White', 'GS-LEGACY-OVERSIZED-BOXY-T-SHIRT-CHALK-WHITE-XL', 5, NULL
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green-xs', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'XS', 'Army Green', 'GS-ARRIVAL-SEAMLESS-SHORT-SLEEVE-T-SHIRT-ARMY-GREEN-XS', 11, NULL
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green-s', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'S', 'Army Green', 'GS-ARRIVAL-SEAMLESS-SHORT-SLEEVE-T-SHIRT-ARMY-GREEN-S', 14, NULL
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green-m', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'M', 'Army Green', 'GS-ARRIVAL-SEAMLESS-SHORT-SLEEVE-T-SHIRT-ARMY-GREEN-M', 22, NULL
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green-l', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'L', 'Army Green', 'GS-ARRIVAL-SEAMLESS-SHORT-SLEEVE-T-SHIRT-ARMY-GREEN-L', 18, NULL
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green-xl', 'arrival-seamless-short-sleeve-t-shirt-army-green', 'XL', 'Army Green', 'GS-ARRIVAL-SEAMLESS-SHORT-SLEEVE-T-SHIRT-ARMY-GREEN-XL', 5, NULL
),
(
  'retake-water-repellent-bomber-jacket-olive-drab-xs', 'retake-water-repellent-bomber-jacket-olive-drab', 'XS', 'Olive Drab', 'GS-RETAKE-WATER-REPELLENT-BOMBER-JACKET-OLIVE-DRAB-XS', 0, NULL
),
(
  'retake-water-repellent-bomber-jacket-olive-drab-s', 'retake-water-repellent-bomber-jacket-olive-drab', 'S', 'Olive Drab', 'GS-RETAKE-WATER-REPELLENT-BOMBER-JACKET-OLIVE-DRAB-S', 11, NULL
),
(
  'retake-water-repellent-bomber-jacket-olive-drab-m', 'retake-water-repellent-bomber-jacket-olive-drab', 'M', 'Olive Drab', 'GS-RETAKE-WATER-REPELLENT-BOMBER-JACKET-OLIVE-DRAB-M', 14, NULL
),
(
  'retake-water-repellent-bomber-jacket-olive-drab-l', 'retake-water-repellent-bomber-jacket-olive-drab', 'L', 'Olive Drab', 'GS-RETAKE-WATER-REPELLENT-BOMBER-JACKET-OLIVE-DRAB-L', 22, NULL
),
(
  'retake-water-repellent-bomber-jacket-olive-drab-xl', 'retake-water-repellent-bomber-jacket-olive-drab', 'XL', 'Olive Drab', 'GS-RETAKE-WATER-REPELLENT-BOMBER-JACKET-OLIVE-DRAB-XL', 18, NULL
),
(
  'power-ribbed-stringer-vest-onyx-black-xs', 'power-ribbed-stringer-vest-onyx-black', 'XS', 'Onyx Black', 'GS-POWER-RIBBED-STRINGER-VEST-ONYX-BLACK-XS', 18, NULL
),
(
  'power-ribbed-stringer-vest-onyx-black-s', 'power-ribbed-stringer-vest-onyx-black', 'S', 'Onyx Black', 'GS-POWER-RIBBED-STRINGER-VEST-ONYX-BLACK-S', 5, NULL
),
(
  'power-ribbed-stringer-vest-onyx-black-m', 'power-ribbed-stringer-vest-onyx-black', 'M', 'Onyx Black', 'GS-POWER-RIBBED-STRINGER-VEST-ONYX-BLACK-M', 2, NULL
),
(
  'power-ribbed-stringer-vest-onyx-black-l', 'power-ribbed-stringer-vest-onyx-black', 'L', 'Onyx Black', 'GS-POWER-RIBBED-STRINGER-VEST-ONYX-BLACK-L', 0, NULL
),
(
  'power-ribbed-stringer-vest-onyx-black-xl', 'power-ribbed-stringer-vest-onyx-black', 'XL', 'Onyx Black', 'GS-POWER-RIBBED-STRINGER-VEST-ONYX-BLACK-XL', 11, NULL
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal-xs', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'XS', 'Heather Oatmeal', 'GS-CREST-CREW-NECK-FLEECE-SWEATSHIRT-HEATHER-OATMEAL-XS', 14, NULL
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal-s', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'S', 'Heather Oatmeal', 'GS-CREST-CREW-NECK-FLEECE-SWEATSHIRT-HEATHER-OATMEAL-S', 22, NULL
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal-m', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'M', 'Heather Oatmeal', 'GS-CREST-CREW-NECK-FLEECE-SWEATSHIRT-HEATHER-OATMEAL-M', 18, NULL
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal-l', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'L', 'Heather Oatmeal', 'GS-CREST-CREW-NECK-FLEECE-SWEATSHIRT-HEATHER-OATMEAL-L', 5, NULL
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal-xl', 'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'XL', 'Heather Oatmeal', 'GS-CREST-CREW-NECK-FLEECE-SWEATSHIRT-HEATHER-OATMEAL-XL', 2, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  '315-heavyweight-lifting-shorts-5-washed-olive-xs', '315-heavyweight-lifting-shorts-5-washed-olive', 'XS', 'Washed Olive', 'GS-315-HEAVYWEIGHT-LIFTING-SHORTS-5-WASHED-OLIVE-XS', 5, NULL
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive-s', '315-heavyweight-lifting-shorts-5-washed-olive', 'S', 'Washed Olive', 'GS-315-HEAVYWEIGHT-LIFTING-SHORTS-5-WASHED-OLIVE-S', 2, NULL
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive-m', '315-heavyweight-lifting-shorts-5-washed-olive', 'M', 'Washed Olive', 'GS-315-HEAVYWEIGHT-LIFTING-SHORTS-5-WASHED-OLIVE-M', 0, NULL
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive-l', '315-heavyweight-lifting-shorts-5-washed-olive', 'L', 'Washed Olive', 'GS-315-HEAVYWEIGHT-LIFTING-SHORTS-5-WASHED-OLIVE-L', 11, NULL
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive-xl', '315-heavyweight-lifting-shorts-5-washed-olive', 'XL', 'Washed Olive', 'GS-315-HEAVYWEIGHT-LIFTING-SHORTS-5-WASHED-OLIVE-XL', 14, NULL
),
(
  'apex-running-windbreaker-jacket-midnight-black-xs', 'apex-running-windbreaker-jacket-midnight-black', 'XS', 'Midnight Black', 'GS-APEX-RUNNING-WINDBREAKER-JACKET-MIDNIGHT-BLACK-XS', 2, NULL
),
(
  'apex-running-windbreaker-jacket-midnight-black-s', 'apex-running-windbreaker-jacket-midnight-black', 'S', 'Midnight Black', 'GS-APEX-RUNNING-WINDBREAKER-JACKET-MIDNIGHT-BLACK-S', 0, NULL
),
(
  'apex-running-windbreaker-jacket-midnight-black-m', 'apex-running-windbreaker-jacket-midnight-black', 'M', 'Midnight Black', 'GS-APEX-RUNNING-WINDBREAKER-JACKET-MIDNIGHT-BLACK-M', 11, NULL
),
(
  'apex-running-windbreaker-jacket-midnight-black-l', 'apex-running-windbreaker-jacket-midnight-black', 'L', 'Midnight Black', 'GS-APEX-RUNNING-WINDBREAKER-JACKET-MIDNIGHT-BLACK-L', 14, NULL
),
(
  'apex-running-windbreaker-jacket-midnight-black-xl', 'apex-running-windbreaker-jacket-midnight-black', 'XL', 'Midnight Black', 'GS-APEX-RUNNING-WINDBREAKER-JACKET-MIDNIGHT-BLACK-XL', 22, NULL
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red-xs', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'XS', 'Crimson Red', 'GS-SPORT-MUSCLE-FIT-LONG-SLEEVE-TOP-CRIMSON-RED-XS', 18, NULL
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red-s', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'S', 'Crimson Red', 'GS-SPORT-MUSCLE-FIT-LONG-SLEEVE-TOP-CRIMSON-RED-S', 5, NULL
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red-m', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'M', 'Crimson Red', 'GS-SPORT-MUSCLE-FIT-LONG-SLEEVE-TOP-CRIMSON-RED-M', 2, NULL
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red-l', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'L', 'Crimson Red', 'GS-SPORT-MUSCLE-FIT-LONG-SLEEVE-TOP-CRIMSON-RED-L', 0, NULL
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red-xl', 'sport-muscle-fit-long-sleeve-top-crimson-red', 'XL', 'Crimson Red', 'GS-SPORT-MUSCLE-FIT-LONG-SLEEVE-TOP-CRIMSON-RED-XL', 11, NULL
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey-xs', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'XS', 'Smoke Grey', 'GS-ARRIVAL-2-IN-1-COMPRESSION-SHORTS-7-SMOKE-GREY-XS', 2, NULL
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey-s', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'S', 'Smoke Grey', 'GS-ARRIVAL-2-IN-1-COMPRESSION-SHORTS-7-SMOKE-GREY-S', 0, NULL
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey-m', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'M', 'Smoke Grey', 'GS-ARRIVAL-2-IN-1-COMPRESSION-SHORTS-7-SMOKE-GREY-M', 11, NULL
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey-l', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'L', 'Smoke Grey', 'GS-ARRIVAL-2-IN-1-COMPRESSION-SHORTS-7-SMOKE-GREY-L', 14, NULL
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey-xl', 'arrival-2-in-1-compression-shorts-7-smoke-grey', 'XL', 'Smoke Grey', 'GS-ARRIVAL-2-IN-1-COMPRESSION-SHORTS-7-SMOKE-GREY-XL', 22, NULL
),
(
  'legacy-raw-edge-drop-tank-desert-sand-xs', 'legacy-raw-edge-drop-tank-desert-sand', 'XS', 'Desert Sand', 'GS-LEGACY-RAW-EDGE-DROP-TANK-DESERT-SAND-XS', 18, NULL
),
(
  'legacy-raw-edge-drop-tank-desert-sand-s', 'legacy-raw-edge-drop-tank-desert-sand', 'S', 'Desert Sand', 'GS-LEGACY-RAW-EDGE-DROP-TANK-DESERT-SAND-S', 5, NULL
),
(
  'legacy-raw-edge-drop-tank-desert-sand-m', 'legacy-raw-edge-drop-tank-desert-sand', 'M', 'Desert Sand', 'GS-LEGACY-RAW-EDGE-DROP-TANK-DESERT-SAND-M', 2, NULL
),
(
  'legacy-raw-edge-drop-tank-desert-sand-l', 'legacy-raw-edge-drop-tank-desert-sand', 'L', 'Desert Sand', 'GS-LEGACY-RAW-EDGE-DROP-TANK-DESERT-SAND-L', 0, NULL
),
(
  'legacy-raw-edge-drop-tank-desert-sand-xl', 'legacy-raw-edge-drop-tank-desert-sand', 'XL', 'Desert Sand', 'GS-LEGACY-RAW-EDGE-DROP-TANK-DESERT-SAND-XL', 11, NULL
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue-xs', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'XS', 'Atlantic Blue', 'GS-CRITICAL-2-0-REGULAR-FIT-T-SHIRT-ATLANTIC-BLUE-XS', 2, NULL
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue-s', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'S', 'Atlantic Blue', 'GS-CRITICAL-2-0-REGULAR-FIT-T-SHIRT-ATLANTIC-BLUE-S', 0, NULL
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue-m', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'M', 'Atlantic Blue', 'GS-CRITICAL-2-0-REGULAR-FIT-T-SHIRT-ATLANTIC-BLUE-M', 11, NULL
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue-l', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'L', 'Atlantic Blue', 'GS-CRITICAL-2-0-REGULAR-FIT-T-SHIRT-ATLANTIC-BLUE-L', 14, NULL
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue-xl', 'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'XL', 'Atlantic Blue', 'GS-CRITICAL-2-0-REGULAR-FIT-T-SHIRT-ATLANTIC-BLUE-XL', 22, NULL
),
(
  'power-cut-off-sleeveless-hoodie-jet-black-xs', 'power-cut-off-sleeveless-hoodie-jet-black', 'XS', 'Jet Black', 'GS-POWER-CUT-OFF-SLEEVELESS-HOODIE-JET-BLACK-XS', 11, NULL
),
(
  'power-cut-off-sleeveless-hoodie-jet-black-s', 'power-cut-off-sleeveless-hoodie-jet-black', 'S', 'Jet Black', 'GS-POWER-CUT-OFF-SLEEVELESS-HOODIE-JET-BLACK-S', 14, NULL
),
(
  'power-cut-off-sleeveless-hoodie-jet-black-m', 'power-cut-off-sleeveless-hoodie-jet-black', 'M', 'Jet Black', 'GS-POWER-CUT-OFF-SLEEVELESS-HOODIE-JET-BLACK-M', 22, NULL
),
(
  'power-cut-off-sleeveless-hoodie-jet-black-l', 'power-cut-off-sleeveless-hoodie-jet-black', 'L', 'Jet Black', 'GS-POWER-CUT-OFF-SLEEVELESS-HOODIE-JET-BLACK-L', 18, NULL
),
(
  'power-cut-off-sleeveless-hoodie-jet-black-xl', 'power-cut-off-sleeveless-hoodie-jet-black', 'XL', 'Jet Black', 'GS-POWER-CUT-OFF-SLEEVELESS-HOODIE-JET-BLACK-XL', 5, NULL
),
(
  'crest-regular-fit-shorts-7-navy-marl-xs', 'crest-regular-fit-shorts-7-navy-marl', 'XS', 'Navy Marl', 'GS-CREST-REGULAR-FIT-SHORTS-7-NAVY-MARL-XS', 22, NULL
),
(
  'crest-regular-fit-shorts-7-navy-marl-s', 'crest-regular-fit-shorts-7-navy-marl', 'S', 'Navy Marl', 'GS-CREST-REGULAR-FIT-SHORTS-7-NAVY-MARL-S', 18, NULL
),
(
  'crest-regular-fit-shorts-7-navy-marl-m', 'crest-regular-fit-shorts-7-navy-marl', 'M', 'Navy Marl', 'GS-CREST-REGULAR-FIT-SHORTS-7-NAVY-MARL-M', 5, NULL
),
(
  'crest-regular-fit-shorts-7-navy-marl-l', 'crest-regular-fit-shorts-7-navy-marl', 'L', 'Navy Marl', 'GS-CREST-REGULAR-FIT-SHORTS-7-NAVY-MARL-L', 2, NULL
),
(
  'crest-regular-fit-shorts-7-navy-marl-xl', 'crest-regular-fit-shorts-7-navy-marl', 'XL', 'Navy Marl', 'GS-CREST-REGULAR-FIT-SHORTS-7-NAVY-MARL-XL', 0, NULL
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal-xs', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'XS', 'Cyber Lime / Charcoal', 'GS-APEX-SEAMLESS-SHORT-SLEEVE-TOP-CYBER-LIME-CHARCOAL-XS', 22, NULL
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal-s', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'S', 'Cyber Lime / Charcoal', 'GS-APEX-SEAMLESS-SHORT-SLEEVE-TOP-CYBER-LIME-CHARCOAL-S', 18, NULL
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal-m', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'M', 'Cyber Lime / Charcoal', 'GS-APEX-SEAMLESS-SHORT-SLEEVE-TOP-CYBER-LIME-CHARCOAL-M', 5, NULL
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal-l', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'L', 'Cyber Lime / Charcoal', 'GS-APEX-SEAMLESS-SHORT-SLEEVE-TOP-CYBER-LIME-CHARCOAL-L', 2, NULL
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal-xl', 'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'XL', 'Cyber Lime / Charcoal', 'GS-APEX-SEAMLESS-SHORT-SLEEVE-TOP-CYBER-LIME-CHARCOAL-XL', 0, NULL
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel-xs', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'XS', 'Vintage Steel', 'GS-HEAVYWEIGHT-OVERSIZED-ACID-WASH-TEE-VINTAGE-STEEL-XS', 14, NULL
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel-s', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'S', 'Vintage Steel', 'GS-HEAVYWEIGHT-OVERSIZED-ACID-WASH-TEE-VINTAGE-STEEL-S', 22, NULL
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel-m', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'M', 'Vintage Steel', 'GS-HEAVYWEIGHT-OVERSIZED-ACID-WASH-TEE-VINTAGE-STEEL-M', 18, NULL
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel-l', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'L', 'Vintage Steel', 'GS-HEAVYWEIGHT-OVERSIZED-ACID-WASH-TEE-VINTAGE-STEEL-L', 5, NULL
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel-xl', 'heavyweight-oversized-acid-wash-tee-vintage-steel', 'XL', 'Vintage Steel', 'GS-HEAVYWEIGHT-OVERSIZED-ACID-WASH-TEE-VINTAGE-STEEL-XL', 2, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'bold-seamless-long-sleeve-top-charcoal-grey-xs', 'bold-seamless-long-sleeve-top-charcoal-grey', 'XS', 'Charcoal Grey', 'GS-BOLD-SEAMLESS-LONG-SLEEVE-TOP-CHARCOAL-GREY-XS', 22, NULL
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey-s', 'bold-seamless-long-sleeve-top-charcoal-grey', 'S', 'Charcoal Grey', 'GS-BOLD-SEAMLESS-LONG-SLEEVE-TOP-CHARCOAL-GREY-S', 18, NULL
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey-m', 'bold-seamless-long-sleeve-top-charcoal-grey', 'M', 'Charcoal Grey', 'GS-BOLD-SEAMLESS-LONG-SLEEVE-TOP-CHARCOAL-GREY-M', 5, NULL
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey-l', 'bold-seamless-long-sleeve-top-charcoal-grey', 'L', 'Charcoal Grey', 'GS-BOLD-SEAMLESS-LONG-SLEEVE-TOP-CHARCOAL-GREY-L', 2, NULL
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey-xl', 'bold-seamless-long-sleeve-top-charcoal-grey', 'XL', 'Charcoal Grey', 'GS-BOLD-SEAMLESS-LONG-SLEEVE-TOP-CHARCOAL-GREY-XL', 0, NULL
),
(
  'arrival-lightweight-track-jacket-stealth-black-xs', 'arrival-lightweight-track-jacket-stealth-black', 'XS', 'Stealth Black', 'GS-ARRIVAL-LIGHTWEIGHT-TRACK-JACKET-STEALTH-BLACK-XS', 2, NULL
),
(
  'arrival-lightweight-track-jacket-stealth-black-s', 'arrival-lightweight-track-jacket-stealth-black', 'S', 'Stealth Black', 'GS-ARRIVAL-LIGHTWEIGHT-TRACK-JACKET-STEALTH-BLACK-S', 0, NULL
),
(
  'arrival-lightweight-track-jacket-stealth-black-m', 'arrival-lightweight-track-jacket-stealth-black', 'M', 'Stealth Black', 'GS-ARRIVAL-LIGHTWEIGHT-TRACK-JACKET-STEALTH-BLACK-M', 11, NULL
),
(
  'arrival-lightweight-track-jacket-stealth-black-l', 'arrival-lightweight-track-jacket-stealth-black', 'L', 'Stealth Black', 'GS-ARRIVAL-LIGHTWEIGHT-TRACK-JACKET-STEALTH-BLACK-L', 14, NULL
),
(
  'arrival-lightweight-track-jacket-stealth-black-xl', 'arrival-lightweight-track-jacket-stealth-black', 'XL', 'Stealth Black', 'GS-ARRIVAL-LIGHTWEIGHT-TRACK-JACKET-STEALTH-BLACK-XL', 22, NULL
),
(
  'sport-7-unlined-training-shorts-rust-orange-xs', 'sport-7-unlined-training-shorts-rust-orange', 'XS', 'Rust Orange', 'GS-SPORT-7-UNLINED-TRAINING-SHORTS-RUST-ORANGE-XS', 22, NULL
),
(
  'sport-7-unlined-training-shorts-rust-orange-s', 'sport-7-unlined-training-shorts-rust-orange', 'S', 'Rust Orange', 'GS-SPORT-7-UNLINED-TRAINING-SHORTS-RUST-ORANGE-S', 18, NULL
),
(
  'sport-7-unlined-training-shorts-rust-orange-m', 'sport-7-unlined-training-shorts-rust-orange', 'M', 'Rust Orange', 'GS-SPORT-7-UNLINED-TRAINING-SHORTS-RUST-ORANGE-M', 5, NULL
),
(
  'sport-7-unlined-training-shorts-rust-orange-l', 'sport-7-unlined-training-shorts-rust-orange', 'L', 'Rust Orange', 'GS-SPORT-7-UNLINED-TRAINING-SHORTS-RUST-ORANGE-L', 2, NULL
),
(
  'sport-7-unlined-training-shorts-rust-orange-xl', 'sport-7-unlined-training-shorts-rust-orange', 'XL', 'Rust Orange', 'GS-SPORT-7-UNLINED-TRAINING-SHORTS-RUST-ORANGE-XL', 0, NULL
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green-xs', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'XS', 'Dark Forest Green', 'GS-LEGACY-HEAVYWEIGHT-FLEECE-JOGGERS-DARK-FOREST-GREEN-XS', 18, NULL
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green-s', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'S', 'Dark Forest Green', 'GS-LEGACY-HEAVYWEIGHT-FLEECE-JOGGERS-DARK-FOREST-GREEN-S', 5, NULL
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green-m', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'M', 'Dark Forest Green', 'GS-LEGACY-HEAVYWEIGHT-FLEECE-JOGGERS-DARK-FOREST-GREEN-M', 2, NULL
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green-l', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'L', 'Dark Forest Green', 'GS-LEGACY-HEAVYWEIGHT-FLEECE-JOGGERS-DARK-FOREST-GREEN-L', 0, NULL
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green-xl', 'legacy-heavyweight-fleece-joggers-dark-forest-green', 'XL', 'Dark Forest Green', 'GS-LEGACY-HEAVYWEIGHT-FLEECE-JOGGERS-DARK-FOREST-GREEN-XL', 11, NULL
),
(
  'geo-seamless-compression-tank-top-ice-blue-xs', 'geo-seamless-compression-tank-top-ice-blue', 'XS', 'Ice Blue', 'GS-GEO-SEAMLESS-COMPRESSION-TANK-TOP-ICE-BLUE-XS', 14, NULL
),
(
  'geo-seamless-compression-tank-top-ice-blue-s', 'geo-seamless-compression-tank-top-ice-blue', 'S', 'Ice Blue', 'GS-GEO-SEAMLESS-COMPRESSION-TANK-TOP-ICE-BLUE-S', 22, NULL
),
(
  'geo-seamless-compression-tank-top-ice-blue-m', 'geo-seamless-compression-tank-top-ice-blue', 'M', 'Ice Blue', 'GS-GEO-SEAMLESS-COMPRESSION-TANK-TOP-ICE-BLUE-M', 18, NULL
),
(
  'geo-seamless-compression-tank-top-ice-blue-l', 'geo-seamless-compression-tank-top-ice-blue', 'L', 'Ice Blue', 'GS-GEO-SEAMLESS-COMPRESSION-TANK-TOP-ICE-BLUE-L', 5, NULL
),
(
  'geo-seamless-compression-tank-top-ice-blue-xl', 'geo-seamless-compression-tank-top-ice-blue', 'XL', 'Ice Blue', 'GS-GEO-SEAMLESS-COMPRESSION-TANK-TOP-ICE-BLUE-XL', 2, NULL
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown-xs', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'XS', 'Washed Earth Brown', 'GS-POWER-HEAVYWEIGHT-WARM-UP-PULLOVER-WASHED-EARTH-BROWN-XS', 2, NULL
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown-s', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'S', 'Washed Earth Brown', 'GS-POWER-HEAVYWEIGHT-WARM-UP-PULLOVER-WASHED-EARTH-BROWN-S', 0, NULL
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown-m', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'M', 'Washed Earth Brown', 'GS-POWER-HEAVYWEIGHT-WARM-UP-PULLOVER-WASHED-EARTH-BROWN-M', 11, NULL
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown-l', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'L', 'Washed Earth Brown', 'GS-POWER-HEAVYWEIGHT-WARM-UP-PULLOVER-WASHED-EARTH-BROWN-L', 14, NULL
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown-xl', 'power-heavyweight-warm-up-pullover-washed-earth-brown', 'XL', 'Washed Earth Brown', 'GS-POWER-HEAVYWEIGHT-WARM-UP-PULLOVER-WASHED-EARTH-BROWN-XL', 22, NULL
),
(
  'sport-breathable-performance-t-shirt-optic-white-xs', 'sport-breathable-performance-t-shirt-optic-white', 'XS', 'Optic White', 'GS-SPORT-BREATHABLE-PERFORMANCE-T-SHIRT-OPTIC-WHITE-XS', 11, NULL
),
(
  'sport-breathable-performance-t-shirt-optic-white-s', 'sport-breathable-performance-t-shirt-optic-white', 'S', 'Optic White', 'GS-SPORT-BREATHABLE-PERFORMANCE-T-SHIRT-OPTIC-WHITE-S', 14, NULL
),
(
  'sport-breathable-performance-t-shirt-optic-white-m', 'sport-breathable-performance-t-shirt-optic-white', 'M', 'Optic White', 'GS-SPORT-BREATHABLE-PERFORMANCE-T-SHIRT-OPTIC-WHITE-M', 22, NULL
),
(
  'sport-breathable-performance-t-shirt-optic-white-l', 'sport-breathable-performance-t-shirt-optic-white', 'L', 'Optic White', 'GS-SPORT-BREATHABLE-PERFORMANCE-T-SHIRT-OPTIC-WHITE-L', 18, NULL
),
(
  'sport-breathable-performance-t-shirt-optic-white-xl', 'sport-breathable-performance-t-shirt-optic-white', 'XL', 'Optic White', 'GS-SPORT-BREATHABLE-PERFORMANCE-T-SHIRT-OPTIC-WHITE-XL', 5, NULL
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black-xs', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'XS', 'Stealth Black', 'GS-ESSENTIAL-RELAXED-FIT-CARGO-JOGGERS-STEALTH-BLACK-XS', 14, NULL
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black-s', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'S', 'Stealth Black', 'GS-ESSENTIAL-RELAXED-FIT-CARGO-JOGGERS-STEALTH-BLACK-S', 22, NULL
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black-m', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'M', 'Stealth Black', 'GS-ESSENTIAL-RELAXED-FIT-CARGO-JOGGERS-STEALTH-BLACK-M', 18, NULL
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black-l', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'L', 'Stealth Black', 'GS-ESSENTIAL-RELAXED-FIT-CARGO-JOGGERS-STEALTH-BLACK-L', 5, NULL
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black-xl', 'essential-relaxed-fit-cargo-joggers-stealth-black', 'XL', 'Stealth Black', 'GS-ESSENTIAL-RELAXED-FIT-CARGO-JOGGERS-STEALTH-BLACK-XL', 2, NULL
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy-xs', 'critical-short-sleeve-compression-baselayer-dark-navy', 'XS', 'Dark Navy', 'GS-CRITICAL-SHORT-SLEEVE-COMPRESSION-BASELAYER-DARK-NAVY-XS', 2, NULL
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy-s', 'critical-short-sleeve-compression-baselayer-dark-navy', 'S', 'Dark Navy', 'GS-CRITICAL-SHORT-SLEEVE-COMPRESSION-BASELAYER-DARK-NAVY-S', 0, NULL
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy-m', 'critical-short-sleeve-compression-baselayer-dark-navy', 'M', 'Dark Navy', 'GS-CRITICAL-SHORT-SLEEVE-COMPRESSION-BASELAYER-DARK-NAVY-M', 11, NULL
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy-l', 'critical-short-sleeve-compression-baselayer-dark-navy', 'L', 'Dark Navy', 'GS-CRITICAL-SHORT-SLEEVE-COMPRESSION-BASELAYER-DARK-NAVY-L', 14, NULL
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy-xl', 'critical-short-sleeve-compression-baselayer-dark-navy', 'XL', 'Dark Navy', 'GS-CRITICAL-SHORT-SLEEVE-COMPRESSION-BASELAYER-DARK-NAVY-XL', 22, NULL
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon-xs', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'XS', 'Washed Maroon', 'GS-HERITAGE-GYMSHARK-BARBELL-CLUB-TEE-WASHED-MAROON-XS', 11, NULL
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon-s', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'S', 'Washed Maroon', 'GS-HERITAGE-GYMSHARK-BARBELL-CLUB-TEE-WASHED-MAROON-S', 14, NULL
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon-m', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'M', 'Washed Maroon', 'GS-HERITAGE-GYMSHARK-BARBELL-CLUB-TEE-WASHED-MAROON-M', 22, NULL
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon-l', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'L', 'Washed Maroon', 'GS-HERITAGE-GYMSHARK-BARBELL-CLUB-TEE-WASHED-MAROON-L', 18, NULL
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon-xl', 'heritage-gymshark-barbell-club-tee-washed-maroon', 'XL', 'Washed Maroon', 'GS-HERITAGE-GYMSHARK-BARBELL-CLUB-TEE-WASHED-MAROON-XL', 5, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

INSERT INTO public.product_variants (id, product_id, size, color, sku, stock, price_override) VALUES
(
  'heavy-duty-padded-lifting-straps-pair-stealth-black-onesize', 'heavy-duty-padded-lifting-straps-pair-stealth-black', 'One Size', 'Stealth Black', 'GS-HEAVY-DUTY-PADDED-LIFTING-STRAPS-PAIR-STEALTH-BLACK-ONESIZE', 18, NULL
),
(
  'everyday-crew-training-socks-3-pack-white-black-grey-onesize', 'everyday-crew-training-socks-3-pack-white-black-grey', 'One Size', 'White / Black / Grey', 'GS-EVERYDAY-CREW-TRAINING-SOCKS-3-PACK-WHITE-BLACK-GREY-ONESIZE', 5, NULL
),
(
  'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black-onesize', 'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black', 'One Size', 'Matte Stealth Black', 'GS-STAINLESS-STEEL-INSULATED-SHAKER-BOTTLE-750ML-MATTE-STEALTH-BLACK-ONESIZE', 18, NULL
),
(
  'everyday-gym-duffle-bag-35l-jet-black-onesize', 'everyday-gym-duffle-bag-35l-jet-black', 'One Size', 'Jet Black', 'GS-EVERYDAY-GYM-DUFFLE-BAG-35L-JET-BLACK-ONESIZE', 18, NULL
),
(
  'resistance-loop-band-set-3-pack-tonal-pink-grey-onesize', 'resistance-loop-band-set-3-pack-tonal-pink-grey', 'One Size', 'Tonal Pink & Grey', 'GS-RESISTANCE-LOOP-BAND-SET-3-PACK-TONAL-PINK-GREY-ONESIZE', 0, NULL
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather-s', '10mm-leather-weightlifting-belt-matte-black-leather', 'S', 'Matte Black Leather', 'GS-10MM-LEATHER-WEIGHTLIFTING-BELT-MATTE-BLACK-LEATHER-S', 18, NULL
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather-m', '10mm-leather-weightlifting-belt-matte-black-leather', 'M', 'Matte Black Leather', 'GS-10MM-LEATHER-WEIGHTLIFTING-BELT-MATTE-BLACK-LEATHER-M', 5, NULL
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather-l', '10mm-leather-weightlifting-belt-matte-black-leather', 'L', 'Matte Black Leather', 'GS-10MM-LEATHER-WEIGHTLIFTING-BELT-MATTE-BLACK-LEATHER-L', 2, NULL
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather-xl', '10mm-leather-weightlifting-belt-matte-black-leather', 'XL', 'Matte Black Leather', 'GS-10MM-LEATHER-WEIGHTLIFTING-BELT-MATTE-BLACK-LEATHER-XL', 0, NULL
),
(
  'legacy-curved-brim-trucker-cap-vintage-black-onesize', 'legacy-curved-brim-trucker-cap-vintage-black', 'One Size', 'Vintage Black', 'GS-LEGACY-CURVED-BRIM-TRUCKER-CAP-VINTAGE-BLACK-ONESIZE', 18, NULL
),
(
  'ribbed-knit-slouch-beanie-heather-grey-onesize', 'ribbed-knit-slouch-beanie-heather-grey', 'One Size', 'Heather Grey', 'GS-RIBBED-KNIT-SLOUCH-BEANIE-HEATHER-GREY-ONESIZE', 5, NULL
),
(
  'gymshark-liquid-chalk-250ml-chalk-white-onesize', 'gymshark-liquid-chalk-250ml-chalk-white', 'One Size', 'Chalk White', 'GS-GYMSHARK-LIQUID-CHALK-250ML-CHALK-WHITE-ONESIZE', 2, NULL
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white-s', '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'S', 'Stealth Black / White', 'GS-7MM-NEOPRENE-KNEE-SLEEVES-PAIR-STEALTH-BLACK-WHITE-S', 22, NULL
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white-m', '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'M', 'Stealth Black / White', 'GS-7MM-NEOPRENE-KNEE-SLEEVES-PAIR-STEALTH-BLACK-WHITE-M', 18, NULL
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white-l', '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'L', 'Stealth Black / White', 'GS-7MM-NEOPRENE-KNEE-SLEEVES-PAIR-STEALTH-BLACK-WHITE-L', 5, NULL
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white-xl', '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'XL', 'Stealth Black / White', 'GS-7MM-NEOPRENE-KNEE-SLEEVES-PAIR-STEALTH-BLACK-WHITE-XL', 2, NULL
),
(
  'heavy-duty-elastic-wrist-wraps-pair-black-red-line-onesize', 'heavy-duty-elastic-wrist-wraps-pair-black-red-line', 'One Size', 'Black / Red Line', 'GS-HEAVY-DUTY-ELASTIC-WRIST-WRAPS-PAIR-BLACK-RED-LINE-ONESIZE', 22, NULL
),
(
  'microfiber-gym-sweat-towel-charcoal-grey-onesize', 'microfiber-gym-sweat-towel-charcoal-grey', 'One Size', 'Charcoal Grey', 'GS-MICROFIBER-GYM-SWEAT-TOWEL-CHARCOAL-GREY-ONESIZE', 0, NULL
),
(
  'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru-onesize', 'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru', 'One Size', 'Raw Cotton Ecru', 'GS-HEAVYWEIGHT-CANVAS-SHOPPER-TOTE-25L-RAW-COTTON-ECRU-ONESIZE', 18, NULL
),
(
  'insulated-half-gallon-water-jug-1-9l-desert-sand-onesize', 'insulated-half-gallon-water-jug-1-9l-desert-sand', 'One Size', 'Desert Sand', 'GS-INSULATED-HALF-GALLON-WATER-JUG-1-9L-DESERT-SAND-ONESIZE', 11, NULL
),
(
  'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack-onesize', 'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack', 'One Size', 'Multi Neutral Pack', 'GS-SEAMLESS-NON-SLIP-HAIR-HEADBANDS-3-PACK-MULTI-NEUTRAL-PACK-ONESIZE', 18, NULL
),
(
  'heavy-fabric-glute-resistance-band-blush-marl-onesize', 'heavy-fabric-glute-resistance-band-blush-marl', 'One Size', 'Blush Marl', 'GS-HEAVY-FABRIC-GLUTE-RESISTANCE-BAND-BLUSH-MARL-ONESIZE', 5, NULL
),
(
  'laser-cut-ultralight-performance-running-cap-optic-white-silver-onesize', 'laser-cut-ultralight-performance-running-cap-optic-white-silver', 'One Size', 'Optic White / Silver', 'GS-LASER-CUT-ULTRALIGHT-PERFORMANCE-RUNNING-CAP-OPTIC-WHITE-SILVER-ONESIZE', 14, NULL
),
(
  'micro-duffle-crossbody-bag-5l-olive-green-onesize', 'micro-duffle-crossbody-bag-5l-olive-green', 'One Size', 'Olive Green', 'GS-MICRO-DUFFLE-CROSSBODY-BAG-5L-OLIVE-GREEN-ONESIZE', 11, NULL
),
(
  'cushioned-ankle-sport-socks-5-pack-triple-white-onesize', 'cushioned-ankle-sport-socks-5-pack-triple-white', 'One Size', 'Triple White', 'GS-CUSHIONED-ANKLE-SPORT-SOCKS-5-PACK-TRIPLE-WHITE-ONESIZE', 0, NULL
),
(
  'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones-onesize', 'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones', 'One Size', 'Neutral Earth Tones', 'GS-NO-PULL-ELASTIC-HAIR-TIES-6-PACK-NEUTRAL-EARTH-TONES-ONESIZE', 5, NULL
)
ON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock;

-- 4. REVIEWS
INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'gymshark-softsense-longline-sports-bra-cherry-red', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Gymshark SoftSense™ Longline Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '26 days'
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '7 days'
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '23 days'
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '24 days'
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Everyday Seamless Short Sleeve Crop Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '3 days'
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '17 days'
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Cropped Full-Zip Fleece Hoodie is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '27 days'
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '7 days'
),
(
  'adapt-camo-seamless-5-shorts-berry-pink', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Camo Seamless 5" Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '21 days'
),
(
  'adapt-camo-seamless-5-shorts-berry-pink', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '10 days'
),
(
  'geo-seamless-high-waisted-leggings-slate-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Geo Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '13 days'
),
(
  'geo-seamless-high-waisted-leggings-slate-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '13 days'
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS Power Heavyweight Oversized T-Shirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '3 days'
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '21 days'
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Minimal Strappy Cross-Back Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '2 days'
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Apex Seamless Waterproof Running Jacket is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '19 days'
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '19 days'
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 Long Sleeve Crop Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '13 days'
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '8 days'
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Oversized Fleece Pullover Hoodie is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '5 days'
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Sweat Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '25 days'
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '19 days'
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Rest Day Lounge Straight Leg Joggers is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '8 days'
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '2 days'
),
(
  'training-midi-high-neck-sports-bra-navy-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Midi High-Neck Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'training-midi-high-neck-sports-bra-navy-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '8 days'
),
(
  'elevate-flared-crossover-leggings-pitch-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Elevate Flared Crossover Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '9 days'
),
(
  'elevate-flared-crossover-leggings-pitch-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '5 days'
),
(
  'gs-lc-ribbed-racerback-tank-forest-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS LC Ribbed Racerback Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '28 days'
),
(
  'gs-lc-ribbed-racerback-tank-forest-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '9 days'
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Everyday Seamless 7" Bike Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '12 days'
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '5 days'
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Speed Reflective Windbreaker Jacket is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '14 days'
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '23 days'
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 Long Sleeve Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '15 days'
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '18 days'
),
(
  'adapt-animal-seamless-leggings-charcoal-grey', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Animal Seamless Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '26 days'
),
(
  'adapt-animal-seamless-leggings-charcoal-grey', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '9 days'
),
(
  'fraction-low-back-sports-bra-lilac-dusk', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Fraction Low-Back Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '12 days'
),
(
  'fraction-low-back-sports-bra-lilac-dusk', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '7 days'
),
(
  'power-muscle-tank-top-deep-plum', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Muscle Tank Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '28 days'
),
(
  'power-muscle-tank-top-deep-plum', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '19 days'
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Hyper Amplified High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '5 days'
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Heavyweight Fleece Crewneck Sweatshirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '25 days'
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '9 days'
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Apex Seamless 2-in-1 Running Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '21 days'
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '15 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'sport-contour-scoop-neck-sports-bra-electric-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Sport Contour Scoop Neck Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '28 days'
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '25 days'
),
(
  'training-lightweight-woven-track-pants-olive-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Lightweight Woven Track Pants is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '8 days'
),
(
  'training-lightweight-woven-track-pants-olive-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'softsense-ribbed-cami-tank-chalk-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this SoftSense Ribbed Cami Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'softsense-ribbed-cami-tank-chalk-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '19 days'
),
(
  'vital-seamless-2-0-4-shorts-emerald-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 4" Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '22 days'
),
(
  'vital-seamless-2-0-4-shorts-emerald-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '10 days'
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS Power Multi-Strap Lifting Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '26 days'
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '7 days'
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Rest Day Seamless All-In-One Unitard is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '3 days'
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '8 days'
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Studio High-Rise Flared Ribbed Pants is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '5 days'
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '20 days'
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Legacy Graphic Oversized Heavyweight Tee is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '9 days'
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '21 days'
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Elevate Packable Windbreaker Anorak is by far one of my favorite purchases. Holds its shape wash after wash!', 'hiking', 16, 'approved', NOW() - INTERVAL '24 days'
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '14 days'
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Fleck Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '3 days'
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Minimal Clean-Cut Cross-Back Bralette is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '9 days'
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '12 days'
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Loose Fit Breathable Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '14 days'
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'vital-seamless-half-zip-pullover-steel-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless Half-Zip Pullover is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '6 days'
),
(
  'vital-seamless-half-zip-pullover-steel-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '25 days'
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Ribbed Cycle Shorts 8" is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '21 days'
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '3 days'
),
(
  'essential-boxy-cropped-t-shirt-chalk-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Essential Boxy Cropped T-Shirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '27 days'
),
(
  'essential-boxy-cropped-t-shirt-chalk-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '28 days'
),
(
  'power-heavyweight-oversized-t-shirt-washed-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Oversized T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'power-heavyweight-oversized-t-shirt-washed-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '24 days'
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Hybrid 5" Performance Running Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '12 days'
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Heavyweight Pullover Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical 2.0 Drop Arm Stringer Vest is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '9 days'
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '7 days'
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival 7" Slim Fit Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '6 days'
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Heavyweight Graphic T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '18 days'
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Geo Seamless Muscle Fit T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '26 days'
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '19 days'
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Seamless Full-Zip Track Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '3 days'
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '13 days'
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Lifting Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '18 days'
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '20 days'
),
(
  'arrival-slim-fit-performance-tank-pure-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Slim Fit Performance Tank is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '15 days'
),
(
  'arrival-slim-fit-performance-tank-pure-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '25 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Breathable Seamless Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '27 days'
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '2 days'
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Slim Fit Fleece Sweatpants is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '6 days'
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heavyweight Heritage Pump Cover Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '0 days'
),
(
  'critical-full-zip-training-hoodie-light-grey-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical Full-Zip Training Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '26 days'
),
(
  'critical-full-zip-training-hoodie-light-grey-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '22 days'
),
(
  'sport-5-lined-training-shorts-cobalt-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport 5" Lined Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '9 days'
),
(
  'sport-5-lined-training-shorts-cobalt-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '9 days'
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Oversized Boxy T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '14 days'
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '7 days'
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Seamless Short Sleeve T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '14 days'
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'retake-water-repellent-bomber-jacket-olive-drab', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Retake Water-Repellent Bomber Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'retake-water-repellent-bomber-jacket-olive-drab', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'power-ribbed-stringer-vest-onyx-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Ribbed Stringer Vest is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '28 days'
),
(
  'power-ribbed-stringer-vest-onyx-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '13 days'
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Crew Neck Fleece Sweatshirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '23 days'
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '1 days'
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this 315 Heavyweight Lifting Shorts 5" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '1 days'
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '7 days'
),
(
  'apex-running-windbreaker-jacket-midnight-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Running Windbreaker Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '24 days'
),
(
  'apex-running-windbreaker-jacket-midnight-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Muscle Fit Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '5 days'
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '3 days'
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival 2-in-1 Compression Shorts 7" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '4 days'
),
(
  'legacy-raw-edge-drop-tank-desert-sand', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Raw Edge Drop Tank is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '6 days'
),
(
  'legacy-raw-edge-drop-tank-desert-sand', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '7 days'
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical 2.0 Regular Fit T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '11 days'
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'power-cut-off-sleeveless-hoodie-jet-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Cut-Off Sleeveless Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'power-cut-off-sleeveless-hoodie-jet-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '29 days'
),
(
  'crest-regular-fit-shorts-7-navy-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Regular Fit Shorts 7" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '1 days'
),
(
  'crest-regular-fit-shorts-7-navy-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Seamless Short Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '4 days'
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heavyweight Oversized Acid Wash Tee is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '8 days'
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '1 days'
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Bold Seamless Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '14 days'
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '1 days'
),
(
  'arrival-lightweight-track-jacket-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Lightweight Track Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '11 days'
),
(
  'arrival-lightweight-track-jacket-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '9 days'
),
(
  'sport-7-unlined-training-shorts-rust-orange', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport 7" Unlined Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '3 days'
),
(
  'sport-7-unlined-training-shorts-rust-orange', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '12 days'
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Heavyweight Fleece Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '18 days'
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '1 days'
),
(
  'geo-seamless-compression-tank-top-ice-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Geo Seamless Compression Tank Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '16 days'
),
(
  'geo-seamless-compression-tank-top-ice-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '3 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Warm-Up Pullover is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '27 days'
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '10 days'
),
(
  'sport-breathable-performance-t-shirt-optic-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Breathable Performance T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '26 days'
),
(
  'sport-breathable-performance-t-shirt-optic-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Essential Relaxed Fit Cargo Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '24 days'
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '16 days'
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical Short Sleeve Compression Baselayer is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '4 days'
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '29 days'
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heritage Gymshark Barbell Club Tee is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '10 days'
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '25 days'
),
(
  'heavy-duty-padded-lifting-straps-pair-stealth-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Duty Padded Lifting Straps (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '0 days'
),
(
  'everyday-crew-training-socks-3-pack-white-black-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Everyday Crew Training Socks (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '22 days'
),
(
  'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Stainless Steel Insulated Shaker Bottle 750ml anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '15 days'
),
(
  'everyday-gym-duffle-bag-35l-jet-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Everyday Gym Duffle Bag 35L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '4 days'
),
(
  'resistance-loop-band-set-3-pack-tonal-pink-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Resistance Loop Band Set (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '20 days'
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this 10mm Leather Weightlifting Belt anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '18 days'
),
(
  'legacy-curved-brim-trucker-cap-vintage-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Legacy Curved Brim Trucker Cap anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '7 days'
),
(
  'ribbed-knit-slouch-beanie-heather-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Ribbed Knit Slouch Beanie anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '10 days'
),
(
  'gymshark-liquid-chalk-250ml-chalk-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Gymshark Liquid Chalk 250ml anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '4 days'
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this 7mm Neoprene Knee Sleeves (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '3 days'
),
(
  'heavy-duty-elastic-wrist-wraps-pair-black-red-line', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Duty Elastic Wrist Wraps (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '20 days'
),
(
  'microfiber-gym-sweat-towel-charcoal-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Microfiber Gym Sweat Towel anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '27 days'
),
(
  'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavyweight Canvas Shopper Tote 25L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '19 days'
),
(
  'insulated-half-gallon-water-jug-1-9l-desert-sand', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Insulated Half-Gallon Water Jug 1.9L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '7 days'
),
(
  'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Seamless Non-Slip Hair Headbands (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '23 days'
),
(
  'heavy-fabric-glute-resistance-band-blush-marl', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Fabric Glute Resistance Band anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '3 days'
),
(
  'laser-cut-ultralight-performance-running-cap-optic-white-silver', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Laser-Cut Ultralight Performance Running Cap anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '13 days'
),
(
  'micro-duffle-crossbody-bag-5l-olive-green', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Micro Duffle Crossbody Bag 5L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '13 days'
),
(
  'cushioned-ankle-sport-socks-5-pack-triple-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Cushioned Ankle Sport Socks (5-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '23 days'
),
(
  'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this No-Pull Elastic Hair Ties (6-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '16 days'
);

-- 5. REFRESH PRODUCT RATING STATS
UPDATE public.products p
SET 
  rating = COALESCE(sub.avg_r, 5.0),
  review_count = COALESCE(sub.cnt, 0)
FROM (
  SELECT product_id, ROUND(AVG(rating)::numeric, 1) as avg_r, COUNT(*) as cnt
  FROM public.reviews
  WHERE status = 'approved'
  GROUP BY product_id
) sub
WHERE p.id = sub.product_id;
