
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function AboutUs() {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const MyButton = ({ children, disabled, ...restProps }) => (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}
      {...restProps}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{t('about_page.header_title')}</Text>
          <Text style={styles.headerDescription}>
            {t('about_page.header_description')}
          </Text>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('about_page.achievements_title')}</Text>
        <Text style={styles.sectionText}>{t('about_page.achievements_description')}</Text>
      </View>

      {/* Call to Action */}


<View style={{ marginTop: 30 }}>
  {/* Card 1 */}
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    }}
  >
    <View
      style={{
        backgroundColor: '#FFF2E1',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Icon name="award" size={22} color="#f7931e" />
    </View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1a1a1a',
      }}
    >
      Trusted by Thousands
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
      }}
    >
      We have successfully served thousands of students, helping them unlock
      their potential and achieve their career goals.
    </Text>
  </View>

  {/* Card 2 */}
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    }}
  >
    <View
      style={{
        backgroundColor: '#FFF2E1',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Icon name="star" size={22} color="#f7931e" />
    </View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1a1a1a',
      }}
    >
      Award-Winning Courses
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
      }}
    >
      Our courses have received recognition and accolades in the industry for
      their quality, depth of content, and effective teaching methodologies.
    </Text>
  </View>

{/*  Card 3 */}
  
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    }}
  >
    <View
      style={{
        backgroundColor: '#FFF2E1',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Icon name="bolt" size={22} color="#f7931e" />
    </View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1a1a1a',
      }}
    >
      Industry Partnerships
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
      }}
    >
     We have established strong partnerships with industry leaders, 
     enabling us to provide our students with access to the latest tools and technologies
    </Text>
  </View>







{/*  Card 3 */}
  
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    }}
  >
    <View
      style={{
        backgroundColor: '#FFF2E1',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Icon name="book" size={22} color="#f7931e" />
    </View>
    


    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        color: '#1a1a1a',
      }}
    >
      Foster Creative Problem-Solving
    </Text>
    <Text
      style={{
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
      }}
    >
     We encourage creative thinking and problem-solving abilities, allowing our students to tackle 
     real-world challenges with confidence and innovation.
    </Text>
  </View>



</View>


      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>
          <Text style={styles.highlight}>{t('about_page.cta_title_highlight')}</Text>
          {t('about_page.cta_title_main')}
        </Text>
        <Text style={styles.ctaDescription}>{t('about_page.cta_description')}</Text>

        <MyButton onPress={() => navigator.navigate('Home')}>
          {t('about_page.cta_button')}
        </MyButton>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f7f8',
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerTextContainer: {
    marginHorizontal: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
  },
  headerDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    lineHeight: 22,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#262626',
  },
  sectionText: {
    color: '#666',
    marginTop: 8,
  },
  ctaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  highlight: {
    color: '#ff9500',
  },
  ctaDescription: {
    color: '#555',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#ff9500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});





















