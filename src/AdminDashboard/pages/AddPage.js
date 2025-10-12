import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, Menu, Provider, Icon } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabaseClient';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { decode } from 'base64-arraybuffer';
const themeColors = {
  primary: "#FF6F00",
  secondary: "#F0F0F0",
  text: "#333333",
  textLight: "#FFFFFF",
  border: "#DDDDDD",
  success: "#28a745",
  error: "#dc3545",
  background: "#FFFFFF",
};

function AddCoursePage() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const user = getAuth().currentUser;

  const [title, setTitle] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [message, setMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('permissionDenied'), t('pleaseGrantGalleryAccess'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true, 
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    if (!title || !playlistId || !description || !price || !imageUri) {
      setMessage(t('addCourse.messages.fillRequired'));
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      
      const arrayBuffer = decode(imageBase64);

      
      const filePath = `public/${Date.now()}-course-image.jpg`;
      const contentType = 'image/jpeg';

      
      const { error: uploadError } = await supabase
        .storage
        .from('images')
        .upload(filePath, arrayBuffer, { contentType, upsert: false });

      if (uploadError) throw uploadError;

      
      const { data: pub } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = pub?.publicUrl;

      
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      
      await addDoc(collection(db, 'courses'), {
        ownerUid: user.uid,
        ownerEmail: user.email ?? null,
        title,
        playlistId,
        description,
        price: Number(price),
        imageUrl: publicUrl,
        createdAt: new Date(),
        category,
      });

      setMessage(t('addCourse.messages.success'));
      setIsLoading(false);
      setTitle('');
      setPlaylistId('');
      setDescription('');
      setPrice('');
      setImageUri(null);
      setImageBase64(null);
      setCategory('');
      setMessage('');
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error) {
      setMessage(`${t('common.errorWord')}: ${error.message}`);
      setIsLoading(false);
    }

  };

  const categories = ['Programming', 'Graphic Design', 'Social Media', 'Marketing', 'Ui/UX'];
  const categoryTranslations = {
    'Programming': t('addCourse.category.programming'),
    'Graphic Design': t('addCourse.category.graphicDesign'),
    'Social Media': t('addCourse.category.socialMedia'),
    'Marketing': t('addCourse.category.marketing'),
    'Ui/UX': t('addCourse.category.uiux')
  };

  return (
    <Provider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>{t('addCourse.title')}</Text>

          <TextInput
            label={t('addCourse.fields.courseTitle')}
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
            activeOutlineColor={themeColors.primary}
            textColor='black'
          />

          <TextInput
            label={t('addCourse.fields.playlistId')}
            value={playlistId}
            onChangeText={setPlaylistId}
            style={styles.input}
            mode="outlined"
            activeOutlineColor={themeColors.primary}
            textColor='black'
          />

          <TextInput
            label={t('addCourse.fields.description')}
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
            numberOfLines={4}
            mode="outlined"
            activeOutlineColor={themeColors.primary}
            textColor='black'
          />

          <TextInput
            label={t('addCourse.fields.priceUSD')}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            activeOutlineColor={themeColors.primary}
            textColor='black'
          />

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity style={styles.dropdown} onPress={() => setMenuVisible(true)}>
                <Text style={styles.dropdownText}>
                  {category ? categoryTranslations[category] : t('addCourse.category.choose')}
                </Text>
                <Icon source="chevron-down" size={24} color={themeColors.text} />
              </TouchableOpacity>
            }
          >
            {categories.map(cat => (
              <Menu.Item
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setMenuVisible(false);
                }}
                title={categoryTranslations[cat]}
              />
            ))}
          </Menu>

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <>
                <Icon source="image-plus" size={40} color={themeColors.primary} />
                <Text style={styles.imagePickerText}>{t('addCourse.fields.coverImage')}</Text>
              </>
            )}
          </TouchableOpacity>

          {message && (
            <View style={[styles.messageContainer, message.includes(t('common.errorWord')) ? styles.errorContainer : styles.successContainer]}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
            labelStyle={styles.submitButtonText}
            contentStyle={{ paddingVertical: 8 }}
          >
            {isLoading ? t('common.savingEllipsis') : t('addCourse.buttons.submit')}
          </Button>

        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: themeColors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dropdown: {
    height: 56,
    borderColor: themeColors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: themeColors.text,
  },
  imagePicker: {
    height: 150,
    borderWidth: 2,
    borderColor: themeColors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginVertical: 16,
  },
  imagePickerText: {
    marginTop: 8,
    color: themeColors.primary,
    fontWeight: '500',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: themeColors.textLight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  successContainer: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  messageText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: themeColors.text,
  },
});

export default AddCoursePage;