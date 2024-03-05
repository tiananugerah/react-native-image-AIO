import React, { useState, useEffect } from 'react';
import { Image, ImageStyle, Platform, StyleProp, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface ImageAIOProps {
  source: string;
  style?: StyleProp<ImageStyle>;
  ImageBrokenStyle?: StyleProp<ImageStyle>;
  parentLoading: boolean;
  PlaceholderComponent?: React.ReactElement; // Use ReactElement for component instances
  placeholder: boolean;
}

const ImageAIO: React.FC<ImageAIOProps> = ({
  source,
  style,
  ImageBrokenStyle,
  parentLoading = false,
  PlaceholderComponent,
  placeholder = false,
  ...props
}) => {
  const isSvg = typeof source === 'string' && source.endsWith('.svg');
  const [isImageBroken, setIsImageBroken] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    async function checkSVGAccessibility(url: string): Promise<boolean> {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        console.log(`Error accessing SVG at ${url}:`, error);
        return false;
      }
    }

    async function validateImage() {
      if (Platform.OS === 'android' && isImageLoaded && !source) {
        setIsImageBroken(true);
      } else if (isSvg && !isImageLoaded) {
        // Change this logic to match your intent
        const isAccessible = await checkSVGAccessibility(source);
        if (isAccessible) {
          setIsImageLoaded(true);
        } else {
          setIsImageBroken(true); // Set as broken if not accessible
        }
      }
    }

    validateImage();
  }, [isSvg, isImageLoaded, source]);

  const showPlaceholder = (parentLoading || !isImageLoaded) && placeholder;

  const handleLoadEnd = () => {
    setIsImageLoaded(true);
  };

  const handleError = () => {
    setIsImageBroken(true);
    setIsImageLoaded(true);
  };

  const imageSource = isImageBroken
    ? require('../../Assets/image/broken_image_placeholder.webp')
    : { uri: source };

  const styleSource = isImageBroken
    ? ImageBrokenStyle
    : isImageLoaded
    ? style
    : { width: 1, height: 1 };

  // Fix for potentially undefined return
  if (isSvg) {
    if (!showPlaceholder && !isImageBroken) {
      return (
        <View style={style}>
          <SvgUri uri={source} width="100%" height="100%" />
        </View>
      );
    } else if (isImageBroken) {
      return (
        <Image
          {...props}
          source={require('../../Assets/image/broken_image_placeholder.webp')}
          style={ImageBrokenStyle || {}}
        />
      );
    } else {
      return PlaceholderComponent || null; // Ensure we return null instead of undefined
    }
  } else {
    return (
      <>
        {showPlaceholder && PlaceholderComponent}
        <Image
          {...props}
          key={`image-${isImageBroken}`}
          source={imageSource}
          style={styleSource}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      </>
    );
  }
};

export { ImageAIO };
