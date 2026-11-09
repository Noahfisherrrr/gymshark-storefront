-- ============================================================
-- GYMSHARK APP - SEED PART 2: REVIEWS & STATS
-- ============================================================

-- REVIEWS
INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'gymshark-softsense-longline-sports-bra-cherry-red', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Gymshark SoftSense™ Longline Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '11 days'
),
(
  'gymshark-softsense-longline-sports-bra-cherry-red', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '18 days'
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '12 days'
),
(
  'vital-seamless-2-0-high-waisted-leggings-black-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '21 days'
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Everyday Seamless Short Sleeve Crop Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '4 days'
),
(
  'everyday-seamless-short-sleeve-crop-top-sage-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '1 days'
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Cropped Full-Zip Fleece Hoodie is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '19 days'
),
(
  'power-cropped-full-zip-fleece-hoodie-washed-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '10 days'
),
(
  'adapt-camo-seamless-5-shorts-berry-pink', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Camo Seamless 5" Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'adapt-camo-seamless-5-shorts-berry-pink', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '26 days'
),
(
  'geo-seamless-high-waisted-leggings-slate-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Geo Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '1 days'
),
(
  'geo-seamless-high-waisted-leggings-slate-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '15 days'
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS Power Heavyweight Oversized T-Shirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '27 days'
),
(
  'gs-power-heavyweight-oversized-t-shirt-pure-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '0 days'
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Minimal Strappy Cross-Back Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'minimal-strappy-cross-back-sports-bra-espresso-brown', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '12 days'
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Apex Seamless Waterproof Running Jacket is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '6 days'
),
(
  'apex-seamless-waterproof-running-jacket-stealth-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '5 days'
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 Long Sleeve Crop Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'vital-seamless-2-0-long-sleeve-crop-top-smokey-grey', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '20 days'
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Oversized Fleece Pullover Hoodie is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '7 days'
),
(
  'training-oversized-fleece-pullover-hoodie-light-grey-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '0 days'
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Sweat Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'sweat-seamless-high-waisted-leggings-deep-teal', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '13 days'
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Rest Day Lounge Straight Leg Joggers is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'rest-day-lounge-straight-leg-joggers-oatmeal-marl', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '24 days'
),
(
  'training-midi-high-neck-sports-bra-navy-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Midi High-Neck Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '29 days'
),
(
  'training-midi-high-neck-sports-bra-navy-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '20 days'
),
(
  'elevate-flared-crossover-leggings-pitch-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Elevate Flared Crossover Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '24 days'
),
(
  'elevate-flared-crossover-leggings-pitch-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '15 days'
),
(
  'gs-lc-ribbed-racerback-tank-forest-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS LC Ribbed Racerback Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '5 days'
),
(
  'gs-lc-ribbed-racerback-tank-forest-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '1 days'
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Everyday Seamless 7" Bike Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '8 days'
),
(
  'everyday-seamless-7-bike-shorts-mocha-brown', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '28 days'
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Speed Reflective Windbreaker Jacket is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '26 days'
),
(
  'speed-reflective-windbreaker-jacket-neon-lime-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '3 days'
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 Long Sleeve Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '0 days'
),
(
  'vital-seamless-2-0-long-sleeve-top-blush-pink', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '6 days'
),
(
  'adapt-animal-seamless-leggings-charcoal-grey', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Animal Seamless Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '28 days'
),
(
  'adapt-animal-seamless-leggings-charcoal-grey', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '16 days'
),
(
  'fraction-low-back-sports-bra-lilac-dusk', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Fraction Low-Back Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '2 days'
),
(
  'fraction-low-back-sports-bra-lilac-dusk', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '21 days'
),
(
  'power-muscle-tank-top-deep-plum', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Muscle Tank Top is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '18 days'
),
(
  'power-muscle-tank-top-deep-plum', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '23 days'
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Hyper Amplified High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '4 days'
),
(
  'hyper-amplified-high-waisted-leggings-crimson-red', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '21 days'
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Heavyweight Fleece Crewneck Sweatshirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '26 days'
),
(
  'heavyweight-fleece-crewneck-sweatshirt-sand-dunes', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '12 days'
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Apex Seamless 2-in-1 Running Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '1 days'
),
(
  'apex-seamless-2-in-1-running-shorts-pitch-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '0 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'sport-contour-scoop-neck-sports-bra-electric-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Sport Contour Scoop Neck Sports Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '9 days'
),
(
  'sport-contour-scoop-neck-sports-bra-electric-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '17 days'
),
(
  'training-lightweight-woven-track-pants-olive-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Lightweight Woven Track Pants is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '16 days'
),
(
  'training-lightweight-woven-track-pants-olive-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '3 days'
),
(
  'softsense-ribbed-cami-tank-chalk-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this SoftSense Ribbed Cami Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '13 days'
),
(
  'softsense-ribbed-cami-tank-chalk-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '26 days'
),
(
  'vital-seamless-2-0-4-shorts-emerald-green', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless 2.0 4" Shorts is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '8 days'
),
(
  'vital-seamless-2-0-4-shorts-emerald-green', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '17 days'
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this GS Power Multi-Strap Lifting Bra is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '15 days'
),
(
  'gs-power-multi-strap-lifting-bra-terracotta-rust', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '26 days'
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Rest Day Seamless All-In-One Unitard is by far one of my favorite purchases. Holds its shape wash after wash!', 'pilates', 16, 'approved', NOW() - INTERVAL '25 days'
),
(
  'rest-day-seamless-all-in-one-unitard-obsidian-black', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '13 days'
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Studio High-Rise Flared Ribbed Pants is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '27 days'
),
(
  'studio-high-rise-flared-ribbed-pants-charcoal-heather', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '17 days'
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Legacy Graphic Oversized Heavyweight Tee is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '21 days'
),
(
  'legacy-graphic-oversized-heavyweight-tee-faded-navy', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '13 days'
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Elevate Packable Windbreaker Anorak is by far one of my favorite purchases. Holds its shape wash after wash!', 'hiking', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'elevate-packable-windbreaker-anorak-pale-taupe', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Adapt Fleck Seamless High-Waisted Leggings is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'adapt-fleck-seamless-high-waisted-leggings-lavender-blue-fleck', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '13 days'
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Minimal Clean-Cut Cross-Back Bralette is by far one of my favorite purchases. Holds its shape wash after wash!', 'yoga', 16, 'approved', NOW() - INTERVAL '14 days'
),
(
  'minimal-clean-cut-cross-back-bralette-dusty-rose', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '4 days'
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Training Loose Fit Breathable Tank is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '19 days'
),
(
  'training-loose-fit-breathable-tank-sunburst-yellow', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '2 days'
),
(
  'vital-seamless-half-zip-pullover-steel-blue', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Vital Seamless Half-Zip Pullover is by far one of my favorite purchases. Holds its shape wash after wash!', 'running', 16, 'approved', NOW() - INTERVAL '17 days'
),
(
  'vital-seamless-half-zip-pullover-steel-blue', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '25 days'
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Power Ribbed Cycle Shorts 8" is by far one of my favorite purchases. Holds its shape wash after wash!', 'weight-lifting', 16, 'approved', NOW() - INTERVAL '10 days'
),
(
  'power-ribbed-cycle-shorts-8-dark-cherry', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '15 days'
),
(
  'essential-boxy-cropped-t-shirt-chalk-white', 'Chloe M.', TRUE, 5,
  'Absolutely incredible quality and fit', 'I''ve bought dozens of gym items over the years, and this Essential Boxy Cropped T-Shirt is by far one of my favorite purchases. Holds its shape wash after wash!', 'athleisure', 16, 'approved', NOW() - INTERVAL '21 days'
),
(
  'essential-boxy-cropped-t-shirt-chalk-white', 'Jessica L.', TRUE, 5,
  'Squat proof and buttery soft', 'Super comfortable during heavy workouts and pilates sessions. Highly recommend getting your usual size.', 'Pilates', 9, 'approved', NOW() - INTERVAL '14 days'
),
(
  'power-heavyweight-oversized-t-shirt-washed-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Oversized T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '17 days'
),
(
  'power-heavyweight-oversized-t-shirt-washed-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '22 days'
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Hybrid 5" Performance Running Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '9 days'
),
(
  'apex-hybrid-5-performance-running-shorts-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '15 days'
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Heavyweight Pullover Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '10 days'
),
(
  'crest-heavyweight-pullover-hoodie-navy-blue-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '16 days'
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical 2.0 Drop Arm Stringer Vest is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'critical-2-0-drop-arm-stringer-vest-charcoal-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '28 days'
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival 7" Slim Fit Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '12 days'
),
(
  'arrival-7-slim-fit-training-shorts-graphite-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '7 days'
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Heavyweight Graphic T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '16 days'
),
(
  'legacy-heavyweight-graphic-t-shirt-dark-olive-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '26 days'
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Geo Seamless Muscle Fit T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '5 days'
),
(
  'geo-seamless-muscle-fit-t-shirt-slate-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Seamless Full-Zip Track Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '1 days'
),
(
  'sport-seamless-full-zip-track-jacket-pitch-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '28 days'
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Lifting Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '1 days'
),
(
  'power-heavyweight-lifting-joggers-washed-charcoal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '10 days'
),
(
  'arrival-slim-fit-performance-tank-pure-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Slim Fit Performance Tank is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'arrival-slim-fit-performance-tank-pure-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '23 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Breathable Seamless Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '12 days'
),
(
  'apex-breathable-seamless-long-sleeve-top-reflective-silver-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '27 days'
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Slim Fit Fleece Sweatpants is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'crest-slim-fit-fleece-sweatpants-black-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heavyweight Heritage Pump Cover Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '24 days'
),
(
  'heavyweight-heritage-pump-cover-hoodie-deep-burgundy', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '15 days'
),
(
  'critical-full-zip-training-hoodie-light-grey-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical Full-Zip Training Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '10 days'
),
(
  'critical-full-zip-training-hoodie-light-grey-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '28 days'
),
(
  'sport-5-lined-training-shorts-cobalt-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport 5" Lined Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '12 days'
),
(
  'sport-5-lined-training-shorts-cobalt-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '10 days'
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Oversized Boxy T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '12 days'
),
(
  'legacy-oversized-boxy-t-shirt-chalk-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '11 days'
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Seamless Short Sleeve T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '17 days'
),
(
  'arrival-seamless-short-sleeve-t-shirt-army-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'retake-water-repellent-bomber-jacket-olive-drab', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Retake Water-Repellent Bomber Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '17 days'
),
(
  'retake-water-repellent-bomber-jacket-olive-drab', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '0 days'
),
(
  'power-ribbed-stringer-vest-onyx-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Ribbed Stringer Vest is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '27 days'
),
(
  'power-ribbed-stringer-vest-onyx-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '20 days'
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Crew Neck Fleece Sweatshirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '19 days'
),
(
  'crest-crew-neck-fleece-sweatshirt-heather-oatmeal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '0 days'
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this 315 Heavyweight Lifting Shorts 5" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '25 days'
),
(
  '315-heavyweight-lifting-shorts-5-washed-olive', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '26 days'
),
(
  'apex-running-windbreaker-jacket-midnight-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Running Windbreaker Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '3 days'
),
(
  'apex-running-windbreaker-jacket-midnight-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Muscle Fit Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '21 days'
),
(
  'sport-muscle-fit-long-sleeve-top-crimson-red', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival 2-in-1 Compression Shorts 7" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '20 days'
),
(
  'arrival-2-in-1-compression-shorts-7-smoke-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '4 days'
),
(
  'legacy-raw-edge-drop-tank-desert-sand', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Raw Edge Drop Tank is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '3 days'
),
(
  'legacy-raw-edge-drop-tank-desert-sand', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '10 days'
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical 2.0 Regular Fit T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '7 days'
),
(
  'critical-2-0-regular-fit-t-shirt-atlantic-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '23 days'
),
(
  'power-cut-off-sleeveless-hoodie-jet-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Cut-Off Sleeveless Hoodie is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'power-cut-off-sleeveless-hoodie-jet-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '19 days'
),
(
  'crest-regular-fit-shorts-7-navy-marl', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Crest Regular Fit Shorts 7" is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '3 days'
),
(
  'crest-regular-fit-shorts-7-navy-marl', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '14 days'
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Apex Seamless Short Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '10 days'
),
(
  'apex-seamless-short-sleeve-top-cyber-lime-charcoal', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heavyweight Oversized Acid Wash Tee is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '27 days'
),
(
  'heavyweight-oversized-acid-wash-tee-vintage-steel', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '22 days'
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Bold Seamless Long Sleeve Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '5 days'
),
(
  'bold-seamless-long-sleeve-top-charcoal-grey', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '4 days'
),
(
  'arrival-lightweight-track-jacket-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Arrival Lightweight Track Jacket is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'arrival-lightweight-track-jacket-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '15 days'
),
(
  'sport-7-unlined-training-shorts-rust-orange', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport 7" Unlined Training Shorts is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '19 days'
),
(
  'sport-7-unlined-training-shorts-rust-orange', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '20 days'
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Legacy Heavyweight Fleece Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '16 days'
),
(
  'legacy-heavyweight-fleece-joggers-dark-forest-green', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '1 days'
),
(
  'geo-seamless-compression-tank-top-ice-blue', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Geo Seamless Compression Tank Top is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '5 days'
),
(
  'geo-seamless-compression-tank-top-ice-blue', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '6 days'
);

INSERT INTO public.reviews (
  product_id, author, verified, rating, title, content, activity, helpful_count, status, created_at
) VALUES
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Power Heavyweight Warm-Up Pullover is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '2 days'
),
(
  'power-heavyweight-warm-up-pullover-washed-earth-brown', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '2 days'
),
(
  'sport-breathable-performance-t-shirt-optic-white', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Sport Breathable Performance T-Shirt is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '13 days'
),
(
  'sport-breathable-performance-t-shirt-optic-white', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '24 days'
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Essential Relaxed Fit Cargo Joggers is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '18 days'
),
(
  'essential-relaxed-fit-cargo-joggers-stealth-black', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '18 days'
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Critical Short Sleeve Compression Baselayer is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '22 days'
),
(
  'critical-short-sleeve-compression-baselayer-dark-navy', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '22 days'
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon', 'Marcus B.', TRUE, 5,
  'Best lifting gear on the market', 'The taper on this Heritage Gymshark Barbell Club Tee is spot on. Doesn''t hug the stomach but shows off chest and shoulders perfectly.', 'Weight Lifting', 22, 'approved', NOW() - INTERVAL '10 days'
),
(
  'heritage-gymshark-barbell-club-tee-washed-maroon', 'Dave R.', TRUE, 4,
  'Super comfortable pump cover', 'Heavyweight feel without being stiff. Survives chalk and wash cycles cleanly.', 'Powerlifting', 14, 'approved', NOW() - INTERVAL '8 days'
),
(
  'heavy-duty-padded-lifting-straps-pair-stealth-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Duty Padded Lifting Straps (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '21 days'
),
(
  'everyday-crew-training-socks-3-pack-white-black-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Everyday Crew Training Socks (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '12 days'
),
(
  'stainless-steel-insulated-shaker-bottle-750ml-matte-stealth-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Stainless Steel Insulated Shaker Bottle 750ml anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '16 days'
),
(
  'everyday-gym-duffle-bag-35l-jet-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Everyday Gym Duffle Bag 35L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '7 days'
),
(
  'resistance-loop-band-set-3-pack-tonal-pink-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Resistance Loop Band Set (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '15 days'
),
(
  '10mm-leather-weightlifting-belt-matte-black-leather', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this 10mm Leather Weightlifting Belt anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '0 days'
),
(
  'legacy-curved-brim-trucker-cap-vintage-black', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Legacy Curved Brim Trucker Cap anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '0 days'
),
(
  'ribbed-knit-slouch-beanie-heather-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Ribbed Knit Slouch Beanie anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '26 days'
),
(
  'gymshark-liquid-chalk-250ml-chalk-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Gymshark Liquid Chalk 250ml anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '22 days'
),
(
  '7mm-neoprene-knee-sleeves-pair-stealth-black-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this 7mm Neoprene Knee Sleeves (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '0 days'
),
(
  'heavy-duty-elastic-wrist-wraps-pair-black-red-line', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Duty Elastic Wrist Wraps (Pair) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '8 days'
),
(
  'microfiber-gym-sweat-towel-charcoal-grey', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Microfiber Gym Sweat Towel anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '26 days'
),
(
  'heavyweight-canvas-shopper-tote-25l-raw-cotton-ecru', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavyweight Canvas Shopper Tote 25L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '25 days'
),
(
  'insulated-half-gallon-water-jug-1-9l-desert-sand', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Insulated Half-Gallon Water Jug 1.9L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '4 days'
),
(
  'seamless-non-slip-hair-headbands-3-pack-multi-neutral-pack', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Seamless Non-Slip Hair Headbands (3-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '1 days'
),
(
  'heavy-fabric-glute-resistance-band-blush-marl', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Heavy Fabric Glute Resistance Band anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '29 days'
),
(
  'laser-cut-ultralight-performance-running-cap-optic-white-silver', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Laser-Cut Ultralight Performance Running Cap anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '20 days'
),
(
  'micro-duffle-crossbody-bag-5l-olive-green', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Micro Duffle Crossbody Bag 5L anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '23 days'
),
(
  'cushioned-ankle-sport-socks-5-pack-triple-white', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this Cushioned Ankle Sport Socks (5-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '4 days'
),
(
  'no-pull-elastic-hair-ties-6-pack-neutral-earth-tones', 'Liam T.', TRUE, 5,
  'Essential gym bag item', 'Honestly wouldn''t train without this No-Pull Elastic Hair Ties (6-Pack) anymore. The durability is far superior to cheap amazon clones.', 'Weight Lifting', 31, 'approved', NOW() - INTERVAL '28 days'
);

-- REFRESH PRODUCT RATING STATS
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
